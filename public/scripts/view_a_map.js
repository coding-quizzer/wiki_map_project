{
  $(() => {
    const $mapTitle = $('.map_title');
    const map_id = $mapTitle.text();
    let mapData = {};
    let centerPoint = {};
    let clickCoords = {};
    const mapIDToPopup = {};

    const map = initializeMap();


    $.ajax({
      method: 'GET',
      url: `/api/maps/${map_id}`
    })
      .then(response => {
        mapData = { ...response.map };
        $mapTitle.text(mapData.name);
        $('title').text(mapData.name);
        return $.get(`/api/maps/${map_id}/points`);
      })
      .then(data => {
        const points = data.points;
        const $pointList = $('#points');
        for (const point of points) {
          addPointButton($pointList, point, map, map_id, mapIDToPopup);
        }
        return points;
      })
      .then(points => {
        centerPoint = markCenter(map, [mapData.latitude, mapData.longitude]);

        centerMap(map, centerPoint, [mapData.latitude, mapData.longitude]);

        for (const point of points) {
          displayPoint(map, map_id, point, mapIDToPopup);

        }
        const $addPointForm = $(`
    <form id = "new-point" action="/api/maps/${map_id}" method="POST">
      <input
        type="text"
        class = "post-point-name"
        name="point-name"
        placeholder="title"
      />
      <input
        type="text"
        class="post-point-description"
        name="point-description"
        placeholder="description"
      />
      <input
        type="text"
        class="post-point-photo-url"
        name="point-photo-url"
        placeholder="Photo URL"
      />


      <button class="add-point" type="submit">Post</button>
      <button type="button" class="set-center">Make Center</button>
      </form>
    `);

        const onMapClick = function (e) {
          const popup = L.popup()
            .setLatLng(e.latlng)
            .setContent($addPointForm[0])
            .openOn(map);
          clickCoords = { ...e.latlng };
        };

        map.on('click', onMapClick);
        const $submitButton = $addPointForm.find('button.add-point');

        $addPointForm.on('submit', function (event) {
          event.preventDefault();
          const query = $(this).serializeArray();
          query.push(
            { name: 'latitude', value: clickCoords.lat },
            { name: 'longitude', value: clickCoords.lng },
            { name: 'mapID', value: map_id }
          );
          $.post(`/api/maps/${map_id}`, $.param(query))
            .then(data => {
              $addPointForm[0].reset();
              addPointButton($('#points'), data, map, map_id, mapIDToPopup);
              const newMarker = displayPoint(map, map_id, data, mapIDToPopup);
              newMarker.openPopup();
            });
        });

        const $centerButton = $addPointForm.children('button.set-center');
        $centerButton.on('click', function (event) {
          const data = {
            latitude: clickCoords.lat,
            longitude: clickCoords.lng,
            mapID: map_id
          };
          $.post(`/api/maps/${map_id}/center`, $.param(data))
            .then(data => {
              centerMap(map, centerPoint, [data.latitude, data.longitude]);
              map.closePopup();
            })
            .catch(err => console.error(err.message));
        });
      });

  });

  const initializeMap = () => {
    const map = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    return map;
  };

  const deletePoint = (map, mapID, marker, pointID) => {
    $.ajax({
      type: "DELETE",
      url: `/api/maps/${mapID}/points/${pointID}`
    }).then(data => {
      console.log(data);
      map.removeLayer(marker);
      const $pointButton = $('#points').find(`[point_id='${pointID}']`).remove();

    }).catch(err => console.error(err.message));
  };

  const displayPoint = (map, mapID, point, idToPopup) => {
    const marker = L.marker([point.latitude, point.longitude]).addTo(map);
    const $popupContent = $('<section class="display-point">');
    const $thumbnail = $('<img>').attr('src', point.img_url).appendTo($popupContent);
    const $popupHeader = $('<header class="display-point>').append($thumbnail).appendTo($popupContent);
    const $title = $('<h4>').text(point.title).appendTo($popupContent);
    const $description = $('<p>').text(point.description).appendTo($popupContent);
    const $deleteButton =$('<button class="btn btn-outline-danger delete-point">Delete</button>').on('click', () => {
      deletePoint(map, mapID, marker, point.id);
    }).appendTo($popupContent);
    marker.bindPopup($popupContent[0]);
    idToPopup[point.id] = marker;
    return marker;
  };

  const markCenter = (map, mapCenter) => {
    const centerIcon = L.divIcon({});
    const marker = L.marker(mapCenter, { icon: centerIcon })
      .addTo(map)
      .bindTooltip('Map center');
    return marker;
  };

  const moveCenter = (map, centerMarker, mapCenter) => {
    centerMarker.setLatLng(mapCenter);
  };

  const centerMap = (map, centerMarker, mapCoords) => {
    moveCenter(map, centerMarker, mapCoords);
    map.setView(mapCoords, 13);

  };

  const addPointButton = (pointList, point, map, map_id, mapIDToPopup) => {
    return $('<button class="point">').attr('point_id', point.id).text(point.title)
      .on('click', function (event) {
        const pointId = ($(this).attr('point_id'));
        $.get(`/api/maps/${map_id}/points/${pointId}`)
          .then(data => {
            const point = data.point;
            map.panTo([point.latitude, point.longitude]);
            mapIDToPopup[pointId].openPopup();
          });
      }).appendTo(pointList);
  };

}
