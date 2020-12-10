const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const func = require('./functionality.js');
const PORT = process.env.PORT || 3000 // test .env file by running node index.js with relevant .env file

app.use( express.urlencoded ( { extended: true } ) );
app.use( express.json( { extended: true } ) );

// end point looks like http://localhost:3000/api/loc/38/-91
app.get('/api/loc/:latitude/:longitude', ( req, res ) => {
  func.search( req.params.latitude, req.params.longitude, res );
})


app.listen( PORT, () => {
  console.log( `Listening on.... ${PORT}` );
});