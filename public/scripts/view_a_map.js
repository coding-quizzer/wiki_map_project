$(() => {
  const $mapTitle = $('.map_title');
  const map_id = $mapTitle.text();
  $.ajax({
    method: 'GET',
    url: `/api/maps/${map_id}`
  })
  .then(response => {
    const map = response.map;
    $mapTitle.text(map.name);
    return $.get(`/api/maps/${map_id}/points`);
  })
  .then(data => {
    const points = data.points;
    console.log(data);
    const $pointList = $('#points');
    for(const point of points) {
      $('<li class="point">').text(point.title).appendTo($pointList);
    }

  })
  .then(data => {
    const map = L.map('map').setView([50.445210, -104.618896], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  })


})
