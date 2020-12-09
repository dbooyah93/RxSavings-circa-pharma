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
let dataHolder = [[39.00142300,-95.68695000], [39.03504000,-95.75870000], [39.05433000,-95.68453000],  [39.05167000,-95.70534000], [39.01638400,-95.65065000], [39.03955000,-95.76459000], [39.5121000,-95.72700000], [38.90775300,-94.60801000], [39.01505300,-95.77866000], [38.95792000,-94.62881500], [38.88534500,-94.62800000], [38.88323000,-94.64518000], [39.04160300, 95.76462600], [39.01550300,-95.76434000], [39.01215700,-95.76394000], [39.05716000,-95.76692000], [39.12984500,-95.71265400], [38.92663200,-94.64744000], [38.1619000,-94.64036600], [39.02931000,-94.27175000], [39.24385000,-94.44961000], [39.02353000,-94.26060500], [39.02419300,-94.25503000], [38.98376500,-94.45930500], [38.99300000, 94.47083000], [39.01070400,-94.27108000], [39.24575800,-94.44702000], [39.03754800,-94.27153000], [38.99534200,-94.47340000], [39.24387000,-94.44186400]]
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

console.log( filterClosest( dataHolder, [38.88534500,-94.62800000] ) );