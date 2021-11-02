'use strict';

const { server } = require( '../src/server.js' );
const supertest = require( 'supertest' );
const req = supertest( server );

describe ( 'server',()=>{

  it( 'should get 404 status', async()=>{
    const res = await req.get( '/123' );
    expect( res.status ).toBe( 404 );
  } );
  
  it( 'should get 404 status', async()=>{
    const res = await req.post( '/' );
    expect( res.status ).toBe( 404 );
  } );
} );

describe( 'food api', () => {
  let id ;
 
  it( 'should create food using POST', async () => {
    
    let food = {
      key: 'strawberry',
      type:'fruit',
    };
    
    const res = await req.post( '/api/v1/food' ).send( food );
  
    expect( res.status ).toEqual( 201 );
    expect( res.body.data.key ).toEqual( 'strawberry' );
    expect( res.body.data.type ).toEqual( 'fruit' );
    id = res.body.id;
  } );

  it( 'should return food using GET', async () => {
    const res = await req.get( '/api/v1/food' );
    expect( res.status ).toEqual( 200 );
    expect( Array.isArray( res.body ) ).toBeTruthy();
  } );

  it( 'should return specific food data using GET', async () => {
    const res = await req.get( `/api/v1/food/${id}` );
    expect( res.body.data.key ).toEqual( 'strawberry' );
    expect( res.body.data.type ).toEqual( 'fruit' );
    expect( res.status ).toEqual( 200 );
  } );

  it( 'should update specific food data using PUT', async () => {
   
    let food = {
      key: 'apple',
      type:'fruit',
    };
    const res = await req.put( `/api/v1/food/${id}` ).send ( food );
    expect( res.body.data.key ).toEqual( 'apple' );
    expect( res.body.data.type ).toEqual( 'fruit' );
    expect( res.status ).toEqual( 200 );
  } );

 
  it( 'should update specific food data using PUT', async () => {
    const res = await req.delete( `/api/v1/food/${id}` );
    expect( res.status ).toEqual( 200 );
  } );

} );


describe( 'clothes api', () => {
  let id ;
  
  it( 'should create clothes using POST', async () => {
    
    let clothes = {
      key: 'training',
      type:'sport',
    };
     
    const res = await req.post( '/api/v1/clothes' ).send( clothes );
    
    expect( res.status ).toEqual( 201 );
    expect( res.body.data.key ).toEqual( 'training' );
    expect( res.body.data.type ).toEqual( 'sport' );
    id = res.body.id;
  } );

 
  it( 'should return clothes using GET', async () => {
    const res = await req.get( '/api/v1/clothes' );
    expect( res.status ).toEqual( 200 );
    expect( Array.isArray( res.body ) ).toBeTruthy();
  } );

 
  it( 'should return specific clothes data using GET', async () => {
    const res = await req.get( `/api/v1/clothes/${id}` );
    expect( res.body.data.key ).toEqual( 'training' );
    expect( res.body.data.type ).toEqual( 'sport' );
    expect( res.status ).toEqual( 200 );
  } );

  
  it( 'should update specific clothes data using PUT', async () => {
   
    let clothes = {
      key: 'jacket',
      type:'formal',
    };
    const res = await req.put( `/api/v1/clothes/${id}` ).send ( clothes );
    expect( res.body.data.key ).toEqual( 'jacket' );
    expect( res.body.data.type ).toEqual( 'formal' );
    expect( res.status ).toEqual( 200 );
  } );

 
  it( 'should update specific food data using PUT', async () => {
    const res = await req.delete( `/api/v1/clothes/${id}` );
    expect( res.status ).toEqual( 200 );
  } );

} );
