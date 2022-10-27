{
  $(() => {
    const $mapTitle = $('.map_title');
    const map_id = $mapTitle.text();
    let mapData = {};
    const mapIDToPopup = {};

    const map = initializeMap();

    console.log(map_id);

    $.ajax({
      method: 'GET',
      url: `/api/maps/${map_id}`
    })
      .then(response => {
        mapData = {...response.map};
        $mapTitle.text(mapData.name);
        $('title').text(mapData.name);
        return $.get(`/api/maps/${map_id}/points`);
      })
      .then(data => {
        const points = data.points;
        console.log(data);
        const $pointList = $('#points');
        for (const point of points) {
          addPointButton($pointList, point);
        }
        return points;
      })
      .then(points => {

        const mapCoords = [mapData.latitude, mapData.longitude];
        const centerMarker = markCenter(map,mapCoords);
        map.setView(mapCoords, 13);

          for (const point of points) {
            displayPoint(map, point, mapIDToPopup);

          }
          const $addPointForm = $(`
    <section>
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
      </form>
      <button class="set-center">Make Center</button>
      <section>
    `);
        let click_coords = [];
        const onMapClick = function (e) {
          const popup = L.popup()
            .setLatLng(e.latlng)
            .setContent($addPointForm[0])
            .openOn(map);
          console.log($addPointForm);
          console.log(popup);
          click_coords = e.latlng;

          };

          map.on('click', onMapClick);
          const $submitButton = $addPointForm.find('button.add-point');

        $addPointForm.on('submit', function (event) {
          event.preventDefault();
          console.log(event);
          const query = $(this).serializeArray();
          console.log($addPointForm);
          query.push(
            { name: 'latitude', value: click_coords.lat },
            { name: 'longitude', value: click_coords.lng },
            { name: 'map_id', value: map_id }
          );
          console.log("post map id", map_id);
          $.post(`/api/maps/${map_id}`, $.param(query))
            .then(data => {
              $addPointForm[0].reset();
              console.log(data);
              addPointButton($('#points'), data);
              const newMarker = displayPoint(map, data, mapIDToPopup);
              newMarker.openPopup();
            });
        });

        $('button.point').on('click', function (event) {
          console.log(event);
          const pointId = ($(this).attr('point_id'));
          $.get(`/api/maps/${map_id}/points/${pointId}`)
            .then(data => {
              const point = data.point;
              map.panTo([point.latitude, point.longitude]);
              mapIDToPopup[pointId].openPopup();
            });
        });
        const $centerButton = $addPointForm.children('button.set-center');

        $($centerButton).on('click', function (event) {
          console.log(event);
          $.post(`/api/maps/${map_id}/center`, {
            latitude: click_coords.latitude,
            longitude: click_coords.longitude})
          .then(data => console.log(data))
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
  }

  const displayPoint = (map, point, idToPopup) => {
    const marker = L.marker([point.latitude, point.longitude]).addTo(map);
    const $popupContent = $('<section>').addClass('display-point');
    const $thumbnail = $('<img>').attr('src', point.img_url).appendTo($popupContent);
    const $title = $('<h4>').text(point.title);
    const $popupHeader = $('<header>').addClass('display-point').append($thumbnail).append($title).appendTo($popupContent);
    const $description = $('<p>').text(point.description).appendTo($popupContent);
    marker.bindPopup($popupContent[0]);
    idToPopup[point.id] = marker;
    return marker;
  };

  const markCenter = (map, mapCenter) => {
    const centerIcon = L.divIcon({ /* className: "center-icon" */ });
    const marker = L.marker(mapCenter, {icon: centerIcon})
    .addTo(map)
    .bindTooltip('Map center');
    return centerIcon;
  }


  const addPointButton = (pointList, point) => {
    $('<button class="point">').attr('point_id', point.id).text(point.title).appendTo(pointList);
  };





}
