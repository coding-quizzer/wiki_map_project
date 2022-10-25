$(() => {
  const $mapTitle = $('.map_title');
  const map_id = $mapTitle.text();
  console.log(map_id);
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


})
