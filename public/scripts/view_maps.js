$(() => {

  $.ajax({
    method: 'GET',
    url: `/api/maps`
  })
  .then((response) => {
    const maps = response.maps;
    // console.log(maps);
    for (let map of maps) {

      const $mapItem = $(`
      <article class="map-item">
      <header>
      <img class="img_url">
      <h2 class="map-name"></h2>
      <i class="fa-regular fa-star"></i>
      </header>
      <footer>
      <p class="createdBy">Created by: Username</p>
      </footer>
      </article>
      `);

      const $img = $mapItem.find('img').attr('src', map.img_url);
      const $mapName = $mapItem.find('.map-name').text(map.name);
      const $createdBy = $mapItem.find('.createdBy').text('Created by: ' + map.username);

      $mapItem.appendTo('#maps-container');

    }

  });


});
