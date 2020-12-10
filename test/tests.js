const expect = require( 'chai' ).expect;
const func = require( '../server/functionality.js' );

describe( `measure`, () => {
  it(`Should return the hypotenuse of two cords on a 2D map`, ( done ) => {
    expect( Math.round( ( func.measure( [ 6, -9 ], [ 9, -6 ] ) ) * 10000 ) / 10000 ).to.equal( 4.2426 );
    done();
  })
});

describe( `filterClosest`, () => {
  let dbList = [
    {
      latitude: 10,
      longitude: -9
    },
    {
      latitude: 9,
      longitude: -7
    },
    {
      latitude: 8,
      longitude: -6
    }
  ]
  let dbList2 = [
    {
      latitude: 6,
      longitude: -9
    },
    {
      latitude: 9,
      longitude: -6
    }
  ]
  let userLoc = [ 6, -7 ];
  let userLoc2 = [ 8, -8 ];
  it( `Should return the cord closest to the user's input`, ( done ) => {
    expect( ( func.filterClosest( dbList, userLoc ) )[0] ).to.equal( dbList[ 2 ] );
    done();
  })
  it( `Should return array of cords closest to a user's input`, ( done ) => {
    expect( ( func.filterClosest( dbList2, userLoc2 ) ) ).to.eql( dbList2 );
    done();
  })
});
