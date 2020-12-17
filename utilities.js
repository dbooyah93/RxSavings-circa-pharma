let dataHolder = [[39.00142300,-95.68695000], [39.03504000,-95.75870000], [39.05433000,-95.68453000],  [39.05167000,-95.70534000], [39.01638400,-95.65065000], [39.03955000,-95.76459000], [39.5121000,-95.72700000], [38.90775300,-94.60801000], [39.01505300,-95.77866000], [38.95792000,-94.62881500], [38.88534500,-94.62800000], [38.88323000,-94.64518000], [39.04160300, 95.76462600], [39.01550300,-95.76434000], [39.01215700,-95.76394000], [39.05716000,-95.76692000], [39.12984500,-95.71265400], [38.92663200,-94.64744000], [38.1619000,-94.64036600], [39.02931000,-94.27175000], [39.24385000,-94.44961000], [39.02353000,-94.26060500], [39.02419300,-94.25503000], [38.98376500,-94.45930500], [38.99300000, 94.47083000], [39.01070400,-94.27108000], [39.24575800,-94.44702000], [39.03754800,-94.27153000], [38.99534200,-94.47340000], [39.24387000,-94.44186400]]
const distance = function ( data ) {

  for ( let i = 0; i < data.length; i++ ) {
    let pharma1 = [ Math.abs( data[ i ][ 0 ] ), Math.abs( data[ i ][ 1 ] ) ];
    for ( let j = i + 1; j < data.length; j++ ) {
      let pharma2 = [ Math.abs( data[ j ][ 0 ] ), Math.abs( data[ j ][ 1 ] ) ];
      let a = Math.abs( pharma1[ 0 ] - pharma2[ 0 ] );
      let b = Math.abs( pharma1[ 1 ] - pharma2[ 1 ] );
      let c = Math.sqrt( ( a * a ) + ( b * b ) );
      return c;
    }
  }
}


const variance = function ( data ) {

  let gap = -1;
  let curCords;
  let compCords;
  let latMin;
  let latMax;
  let longMin;
  let longMax;
  for ( let i = 0; i < data.length; i++ ) {
    compCords = undefined;
    curCords = data[ i ];
    for ( let j = 1 + i; j < data.length; j++ ) {
      checkCords = data[ j ];
      if ( compCords === undefined ) {
        compCords = checkCords;
      } else {
        if ( curCords[ 0 ] >= compCords[ 0 ] ) {
          latMin = compCords[ 0 ];
          latMax = curCords[ 0 ];
        } else {
          latMin = curCords[ 0 ];
          latMax = compCords[ 0 ];
        }
        if ( curCords[ 1 ] >= compCords[ 1 ] ) {
          longMin = compCords[ 1 ];
          longMax = curCords[ 1 ];
        } else {
          longMin = curCords[ 1 ];
          longMax = compCords[ 1 ];
        }
        if ( checkCords[ 0 ] > latMin && checkCords[ 0 ] < latMax && checkCords[ 1 ] > longMin && checkCords[ 1 ] < longMax ) {
          compCords = checkCords;
          gap = -1;
        }
      }
    }
    if ( compCords !== undefined ) {
      gaping = distance( [ curCords, compCords ] );
      gap = gap < gaping ? gaping : gap;
    }
  }
  console.log( gap );
}

variance( dataHolder );