## Wikimap Project

Wikimap is a full-stack RESTful web app that allows users to share maps of their favourite places.

## Getting Started

1. Install dependencies using npm install
2. Start the server using npm start. The app will be served at <http://localhost:8080/>. The port can also be reconfigured using the PORT environment variable 
3. Go to <http://localhost:8080/> in your browser

## Screenshots
!['Screenshot of page with all maps'](https://github.com/coding-quizzer/wiki_map_project/blob/master/docs/view-all-maps.png?raw=true)
!['Screenshot of form for adding a point'](https://github.com/coding-quizzer/wiki_map_project/blob/master/docs/add-a-point.png?raw=true)
!['Screenshot of a selected map point'](https://github.com/coding-quizzer/wiki_map_project/blob/master/docs/view-map-point.png?raw=true)
!['Screenshot of user profile'](https://github.com/coding-quizzer/wiki_map_project/blob/master/docs/profile-page.png?raw=true)

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- DotENV
- BcryptJS
- Cookie-session
- Express
- Morgan
- SASS

## Known Bugs
 - Logged in users can edit any map, not just their own
 - Users who are not logged in can use the form to add a point, but when they submit, the form disappears without explanation and no point appears
