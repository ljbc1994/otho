import inView from '../../src/utils/in-view';

var assert = require('assert');

describe( '#inView( el )', function() {
   
    var tests = [
        { args: { top: 10, left: 10, bottom: 10, right: 1024 }, expected: true },
        { args: { top: 10, left: 10, bottom: 768, right: 10 }, expected: true }
    ];
	
    tests.forEach( function( test ) {
        
        it( `should return ${test.expected} when the element is ${test.expected ? 'in' : 'not in'} the window`, function() {
        
            let el = {
                getBoundingClientRect: () => {
                    
                    let { top, left, bottom, right } = test.args;
                    
                    return { top: top, left: left, bottom: bottom, right: right };
                
                }
            }
			
            assert( test.expected, inView( el ) );
            
        } );
        
    } );
    
} );