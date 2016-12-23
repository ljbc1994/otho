import isArray from '../../src/utils/is-array';

var assert = require('assert');

describe( '#isArray( el )', function() {
    
    var tests = [
        { args: '', type: 'string', expected: false },
        { args: {}, type: 'object', expected: false },
        { args: { length: 0 }, type: 'object with length method', expected: false },
        { args: 1, type: 'integer', expected: false },
        { args: function() {}, type: 'function', expected: false },
        { args: [], type: 'array', expected: true }
    ];
    
    tests.forEach( function( test ) {
        
        it( `should return ${ test.expected } when the value is a ${ test.type }`, function() {
            
            assert.equal( test.expected, isArray( test.args ) );
            
        } );
        
    } );
    
} );