$(() => {

  const userId = $('#title').text();
  console.log(userId);
  $('#title').text("VIEW ALL MAPS");
  const favMapIDs = [];
  $.get(`/api/users/${userId}/favorites`)
    .then(data => {
      if (!userId) return $.get('/api/maps');
      console.log(data.favoriteIDs);
      favMapIDs.push(...data.favoriteIDs);
      return $.get('/api/maps');
    })
    .catch(err => {
      console.error(err.message)
      return $.get('/api/maps');
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
        const $favButton = $mapItem.find('.fa-star').attr('map_id', map.id);
        if (favMapIDs.includes(map.id)){
          $favButton.addClass('favorited');
        }

        $mapItem.appendTo('#maps-container');



        $favButton.on('click', function (event) {
          $( this ).parents('.maps-view')
          console.log(this);
          event.preventDefault();
          event.stopPropagation();
          if (!($(this).hasClass('favorited'))) {
            $.post(`api/users/${userId}/favorites`, {
              userId,
              mapID: map.id
            })
            .then(data => {
              console.log(data);
              $(this).addClass('favorited');
            });
          } else {
            $.ajax({
              type: 'DELETE',
              url: `/api/users/${userId}/favorites/${map.id}`
            })
            .then(response => {
              console.log(response);
              $(this).removeClass('favorited');
            })

          }
        });

      }

      $('article.map-item').on('click', function (event) {
        $(this).parents('form').trigger('submit');
      });



    });


});
