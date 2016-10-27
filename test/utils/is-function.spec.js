var assert = require('assert');

import isFunction from '../../src/utils/is-function';


describe( '#isFunction( el )', function() {
    
    var tests = [
        { args: '', type: 'string', expected: false },
        { args: {}, type: 'object', expected: false },
        { args: { length: 0 }, type: 'object with length method', expected: false },
        { args: 1, type: 'integer', expected: false },
        { args: [], type: 'array', expected: false },
        { args: function() {}, type: 'function', expected: true }
    ];
    
    tests.forEach( function( test ) {
        
        it( `should return ${ test.expected } when the value is a ${ test.type }`, function() {
            
            assert.equal( test.expected, isFunction( test.args ) );
            
        } );
        
    } );
    
} );