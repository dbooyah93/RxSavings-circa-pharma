const express = require('express');
const app = express();
const func = require('./functionality.js');
const PORT = process.env.PORT || 3000 // test .env file by running node index.js with relevant .env file

app.use( express.urlencoded ( { extended: true } ) );
app.use( express.json( { extended: true } ) );

// end point looks like http://localhost:3000/api/loc/38/-91
app.get('/api/loc/:latitude/:longitude', ( req, res ) => {
  let result;
  // implement func.search(lat, long)
  // result = ^^^^^^^^^^^
  func.search( req.param( 'latitude' ), req.param( 'longitude' ), res );
  // NEEDS res.send() TO EXECUTE PROPERLY
})


app.listen( PORT, () => {
  console.log( `Listening on.... ${PORT}` );
});