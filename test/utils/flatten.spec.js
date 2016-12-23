import flatten from '../../src/utils/flatten';

var assert = require('assert');

describe( '#flatten( arrays )', function() {
   
    it( 'should return an array when the array is one-dimensional', function() {

		let arr = [ 0, 1, 2, 3 ];
		
        assert( arr, flatten( arr ) );
        
    } );
	
	it( 'should return a merged array when the array is two-dimensional', function() {
		
		let arr = [ 0, 1, [ 2, 3 ], 4, 5 ];
		
		assert( [ 0, 1, 2, 3, 4, 5 ], flatten( arr ) );
		
	} );
	
	it( 'should return a merged array when the array is multi-dimensional', function() {
		
		let arr = [ [ [ 0, 1 ], 2 ], 3, 4, [ 5 ] ];
		
		assert( [ 0, 1, 2, 3, 4, 5 ], flatten( arr ) );
		
	} );
	
	var tests = [
        { args: '', type: 'string', },
        { args: {}, type: 'object', },
        { args: { length: 0 }, type: 'object with length method',  },
        { args: 1, type: 'integer' },
        { args: () => {}, type: 'function' }
    ];
	
	tests.forEach( function( test ) {
		
		it( `should throw an error if a ${ test.type } is specified`, function() {
			
			let notArr = 1;
			
			assert.throws( () => flatten( test.args ), Error );
			
		} );
		
	} );
    
} );