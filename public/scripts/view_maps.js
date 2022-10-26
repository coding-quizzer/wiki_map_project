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
      <form class="maps-view" method="GET" action="/maps/${map.id}">
      <article class="map-item">
      <header class="info-container">
      <img class="img_url">
      </header>
      <div class="name-creator">
      <h2 class="map-name"></h2>
      <p class="createdBy">Created by: Username</p>
      </div>
      <div class="foot">
      <i class="fa-solid fa-star"></i>
      </div>
      </article>
      </form>
      `);

        const $img = $mapItem.find('img').attr('src', map.img_url);
        const $mapName = $mapItem.find('.map-name').text(map.name);
        const $createdBy = $mapItem.find('.createdBy').text('Created by: ' + map.username);

        $mapItem.appendTo('#maps-container');

      }

      $('.foot').on('click', function(event) {
        event.stopPropagation();
      });

      $('article.map-item').on('click', function (event) {
        $(this).parents('form').trigger('submit');
      });


    });


});
