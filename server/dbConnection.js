const mysql = require('mysql');

const session = mysql.createConnection({
  host: 'localhost',
  user: 'rxuser',
  password: 'rxuser',
  database: 'RxPharmas'
})

let query = `SELECT * FROM pharmas WHERE latitude BETWEEN 38 AND 39 AND longitude BETWEEN -95 AND -94`;
console.log( session.query( query, ( err, results ) => {
  if ( err ) {
    return err;
  }
  return results;
}));


module.exports = {
  session
}