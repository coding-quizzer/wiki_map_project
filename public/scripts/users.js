// Client facing scripts here
$(() => {
  const $profileHeader = $('#profile-title');
  const userId = $profileHeader.text();

  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`
  })
    .then((response) => {
      const user = response.user;
      const $userHeading = $('#profile-title').text(user.username);
    });

  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/favorites/names`
  })
    .then(favorites => {
      const $favorites = $('#favorites');
      for (const favorite of favorites) {
        const $favLink = $(`<a>`).text(`${favorite.name}`).attr('href', `/maps/${favorite.id}`)
        $(`<li class="favorite">`).append($favLink).appendTo($favorites);
      }
    })
    .catch(err => {
      console.error(err.stack);
    });

  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/maps`
  })
    .then(response => {
      const maps = response.maps;
      const $maps = $('#my-maps');
      for (const map of maps) {
        const $mapLink = $(`<a>`).text(`${map.name}`).attr('href', `/maps/${map.id}`)
        $(`<li class="map">`).append($mapLink).appendTo($maps);
      }
    })
    .catch(err => {
      console.error(err.stack);
    });



});
