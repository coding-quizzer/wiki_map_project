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
      $('<li class="point">').text(point.title).appendTo($pointList);
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
      const coords = [point.latitude, point.longitude];
      const marker = L.marker(coords).addTo(map);
      const pointName = point.title;
      const $popupContent = $('<section>');
      const $title = $('<h5>').text(pointName).appendTo($popupContent);
      const $description = $('<p>').text(point.description).appendTo($popupContent);
      marker.bindPopup($popupContent[0]);
    }
  })
})
