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

}