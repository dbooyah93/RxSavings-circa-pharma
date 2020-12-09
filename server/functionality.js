const { pool } = require('./dbConnection.js')

const distance = function ( pharma, user ) {
  // finds the distance between two points on a grid
  // input should be [ [num, num], [num, num] ]
    let pharmaAbs = [ Math.abs( pharma[ 0 ] ), Math.abs( pharma[ 1 ] ) ];
    let userAbs = [ Math.abs( user[ 0 ] ), Math.abs( user[ 1 ] ) ];
    let a = Math.abs( pharmaAbs[ 0 ] - userAbs[ 0 ] );
    let b = Math.abs( pharmaAbs[ 1 ] - userAbs[ 1 ] );
    let c = Math.sqrt( ( a * a ) + ( b * b ) );
    return c;
}

const filterClosest = function ( dbList, userLoc ) {
  let gap = Infinity;
  let closestPharma = [];
  for ( let i = 0; i < dbList.length; i++ ) {
    let measurement = distance( [ dbList[ i ].latitude, dbList[ i ].longitude ], userLoc );
    if ( gap >= measurement ) {
      if ( gap > measurement ) {
        closestPharma = [ dbList[ i ] ];
        gap = measurement;
      } else {
        closestPharma.push( dbList[ i ] );
      }
    }
  }
  return closestPharma;
}

const search = function ( userLatitude, userLongitude, res ) {
  // after a connection -> con.connect(...)
  const variance = 0.25052082963298744 * 2; // based on utility function
  let latTemp = userLatitude;
  let longTemp = userLongitude;

  // vvv this is perfect for unit testing. Test the for the possible inputs that fall within the variance
  /** 38.81/-95.69, 38.81/-94.21, 39.19/-94.21, 39.19/-95.69 **/
  if ( userLatitude < 38.8 || userLatitude > 39.2 ) {
    userLatitude = userLatitude < 38.8 ? 38.8 : 39.2;
  }
  if ( userLongitude < -95.7 || userLongitude > -94.2 ) {
    userLongitude = userLongitude < -95.7 ? -95.7 : -94.2;
  }
  let latRange = `${ userLatitude - variance } AND ${ Number( userLatitude ) + variance }`;
  let longRange = `${ userLongitude - variance } AND ${ Number( userLongitude ) + variance }`;
  // let query = `SELECT * FROM pharmas WHERE latitude BETWEEN 38.748 AND 39.2495 AND longitude BETWEEN -95.245 AND -94.748`;
  let query = `SELECT * FROM pharmas WHERE latitude BETWEEN ${ latRange } AND longitude BETWEEN ${ longRange }`;
  pool
  .then( ( conn ) => {
    return conn.getConnection()
  })
  .then( ( conn ) => {
    return conn.query( query )
  })
  .then( ( results ) => {
    userLatitude = latTemp;
    userLongitude = longTemp;
    return filterClosest( results, [ userLatitude, userLongitude ]);
  })
  .then( ( result ) => {
    res.send( result );
  })
  .catch( ( err ) => {
    res.send( 'Error with search. Contact admin.' )
  });
}

const test = function ( ) {
  console.log('test');
}

module.exports = { filterClosest, search, test };