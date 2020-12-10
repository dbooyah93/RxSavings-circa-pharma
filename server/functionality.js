const { pool } = require( './dbConnection.js' )
const axios = require( 'axios' );

const measure = function ( pharma, user ) {
    let pharmaAbs = [ Math.abs( pharma[ 0 ] ), Math.abs( pharma[ 1 ] ) ];
    let userAbs = [ Math.abs( user[ 0 ] ), Math.abs( user[ 1 ] ) ];
    let a = Math.abs( pharmaAbs[ 0 ] - userAbs[ 0 ] );
    let b = Math.abs( pharmaAbs[ 1 ] - userAbs[ 1 ] );
    let c = Math.sqrt( ( a * a ) + ( b * b ) );
    return c;
}


const pathFinder = ( userLng, userLat, pharmaLng, pharmaLat ) => {
  let APIKEY = 'pk.eyJ1IjoiZGJvb3lhaDkzIiwiYSI6ImNraWkwa2J2azA2MG0ycXA0azVsbnkzNjgifQ.jDImp9lKdtOuoqM9jNtOwQ'
  let url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLng},${userLat};${pharmaLng},${pharmaLat}?alternatives=true&geometries=geojson&steps=true&access_token=${APIKEY}`;
  return axios.get( url );
  }

const filterClosest = function ( dbList, userLoc ) {
  let gap = Infinity;
  let closestPharma = [];
  for ( let i = 0; i < dbList.length; i++ ) {
    let measurement = measure( [ dbList[ i ].latitude, dbList[ i ].longitude ], userLoc );
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
  const variance = 0.25052082963298744 * 2;
  let latTemp = userLatitude;
  let longTemp = userLongitude;
  let closestPharma;

  if ( userLatitude < 38.8 || userLatitude > 39.2 ) {
    userLatitude = userLatitude < 38.8 ? 38.8 : 39.2;
  }
  if ( userLongitude < -95.7 || userLongitude > -94.2 ) {
    userLongitude = userLongitude < -95.7 ? -95.7 : -94.2;
  }
  let latRange = `${ userLatitude - variance } AND ${ Number( userLatitude ) + variance }`;
  let longRange = `${ userLongitude - variance } AND ${ Number( userLongitude ) + variance }`;
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
    closestPharma = filterClosest( results, [ userLatitude, userLongitude ]);
    return pathFinder( userLongitude, userLatitude, closestPharma[0].longitude, closestPharma[0].latitude )
  })
  .then ( ( response ) => {
    let fastest;
    let routes = response.data.routes;
    for ( let i = 0; i < routes.length; i++ ) {
      if ( fastest === undefined || fastest < routes[ i ].distance ) {
        fastest = routes[ i ].distance;
      }
    }
    fastest = fastest / 1609;
    closestPharma[0].miles = fastest;
    return closestPharma;
  })
  .then( ( closestPharma ) => {
    res.send( closestPharma )
  })
  .catch( ( err ) => {
    res.send( 'Error with search. Contact admin.' )
  });
}

const test = function ( ) {
  console.log('test');
}

module.exports = { filterClosest, search, measure, test };