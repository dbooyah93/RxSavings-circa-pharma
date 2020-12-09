const express = require('express');
const app = express()
const PORT = 3000 // consider implementing an .evn file

app.use( express.urlencoded() );
app.use( express.json() );

// end point looks like http://localhost:3000/api/loc/38/-91
app.get('/api/loc/:latitude/:longitude', ( req, res ) => {
  res.send( `Latitude ${req.param( 'latitude' )} and Longitude ${req.param( 'longitude' )}`)
})

app.listen( PORT, () => {
  console.log( `Listening on.... ${PORT}` );
});