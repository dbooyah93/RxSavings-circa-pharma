const mysql = require('promise-mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'rxuser',
  password: 'rxuser',
  database: 'RxPharmas'
})

let query = `SELECT * FROM pharmas WHERE latitude BETWEEN 38 AND 39 AND longitude BETWEEN -95 AND -94`;
console.log( 'pre' );

pool
  .then( ( conn ) => {
    return conn.getConnection()
  })
  .then( ( conn ) => {
    return conn.query( query )
  })
  .then( ( result ) => {
    console.log( result );
  })
  .catch( ( err ) => {
    console.log( err)
  })

// session
//   .then( ( con ) => {
//     let result = con.query( query );
//     con.end();
//     return result;
//   })
//   .then( ( results ) => {
//     console.log( results );
//   })
//   .catch ( ( error ) => {
//     console.log( 'There was an error ' + error )
//   })
console.log( 'post' );

/** Clean code for using session to query the RxPharmas DB **/
// console.log( session.query( query, ( err, results, fields ) => {
//   if ( err ) {
//     return console.log( `there was an error: .... ${err}` );
//   }
//   console.log( results );
// }) );
// console.log('2')

module.exports = {
  pool
}