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
    const popup = L.popup()
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
    </form>
    `)
    let click_coords = [];
    const onMapClick = function(e){
      console.log(e.latlng);
        popup
         .setLatLng(e.latlng)
        .setContent($addPointForm[0])
        .addTo(map);
        click_coords = e.latlng;

    };

    map.on('click', onMapClick);
    const $submitButton = $addPointForm.find('button.add-point');

    $addPointForm.on('submit', function(event) {
      event.preventDefault();
      const $nameField = $(this).children('.post-point-name');
      console.log(click_coords);
      const query = $(this).serializeArray();
      query.push({name: 'latitude',  value: click_coords.lat});
      query.push({name: 'longitude', value: click_coords.lng});
      query.push({name: 'map_id', value: map_id});
      $.post(`/api/maps/${map_id}`, $.param(query))
        .then(data => {
          $addPointForm[0].reset();
          console.log(data)});
    })

    $('button.point').on('click', function(event) {
      console.log(event);
      const pointId = ($(this).attr('point_id'));
      $.get(`/api/maps/${map_id}/points/${pointId}`)
      .then (data => {
        const point = data.point;
        map.panTo([point.latitude, point.longitude])
      });
    });

  })
})
