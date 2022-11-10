## Wikimap Project

Wikimap is a full-stack RESTful web app that allows users to share maps of their favourite places.

## Getting Started

1. Install dependencies using npm install
2. Start the server using npm start. The app will be served at <http://localhost:8080/>. The port can also be reconfigured using the PORT environment variable 
3. Go to <http://localhost:8080/> in your browser

## Screenshots

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
