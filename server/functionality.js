const { session } = require('./dbConnection.js')

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

// let userTest = [ 8, -10 ];
// let pharmaTest = [ 10, -10 ];

// console.log( distance( pharmaTest, userTest ))
const filterClosest = function ( dbList, userLoc ) {
  let gap = Infinity;
  let closestPharma = [];
  for ( let i = 0; i < dbList.length; i++ ) {
    let measurement = distance( dbList[ i ], userLoc );
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

const search = function ( userLatitude, userLongitude ) {
  // after a connection -> con.connect(...)
  const variance = 0.25052082963298744; // based on utility function
  let latRange = `${ userLatitude - variance } AND ${ userLatitude + variance }`;
  let longRange = `${ userLongitude - variance } AND ${ userLongitude + variance }`;
  let query = `SELECT * FROM pharmas WHERE latitude BETWEEN ${ latRange } AND longitude BETWEEN ${ longRange }`;
  session.query( query, ( err, result, fields ) => {
    if ( err ) {
      console.log( `There was an ERROR ${ err }` );
    } else {
      return result;
    }
  })
}

const test = function ( ) {
  console.log('test');
}

module.exports = { filterClosest, search, test };