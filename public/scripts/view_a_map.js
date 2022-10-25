$(() => {
  const $mapTitle = $('.map_title');
  const map_id = $mapTitle.text();
  let mapData = {};
  $.ajax({
    method: 'GET',
    url: `/api/maps/${map_id}`
  })
  .then(response => {
    mapData = response.map;
    $mapTitle.text(mapData.name);
    $('title').text(mapData.name);
    return $.get(`/api/maps/${map_id}/points`);
  })
  .then(data => {
    const points = data.points;
    console.log(data);
    const $pointList = $('#points');
    for(const point of points) {
      $('<button class="point">').attr('point_id', point.id).text(point.title).appendTo($pointList);
    }
    return points;

  })
  .then(points => {
    const mapCoords = [mapData.latitude, mapData.longitude];
    const map = L.map('map').setView(mapCoords, 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    for (const point of points) {
      const marker = L.marker([point.latitude, point.longitude]).addTo(map);
      const $popupContent = $('<section>').addClass('display-point');
      const $thumbnail = $('<img>').attr('src', point.img_url).appendTo($popupContent);
      const $title = $('<h4>').text(point.title);
      const $popupHeader = $('<header>').addClass('display-point').append($thumbnail).append($title).appendTo($popupContent);
      const $description = $('<p>').text(point.description).appendTo($popupContent);
      marker.bindPopup($popupContent[0]);

    }

    $('button.point').on('click', function(event) {
      const pointId = ($(this).attr('point_id'));
      $.get(`/api/maps/${map_id}/points/${pointId}`)
      .then (data => {
        const point = data.point;
        map.panTo([point.latitude, point.longitude])
      });
    });
  })
})
