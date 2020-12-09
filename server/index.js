const express = require('express');
const app = express()
const PORT = 3000 // consider implementing an .evn file

app.use( express.urlencoded() );
app.use( express.json() );

app.get('/api/loc/:latitude/:longitude', ( req, res ) => {
  res.send( );
})

app.listen( PORT, () => {
  console.log( `Listening on.... ${PORT}` );
});