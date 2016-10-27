var assert = require('assert');

import isNodeList from '../../src/utils/is-node-list';


describe( '#isNodeList( nodes )', function() {
    
    var tests = [
        { args: '', type: 'string', expected: false },
        { args: {}, type: 'object', expected: false },
        { args: 1, type: 'integer', expected: false },
        { args: [], type: 'array', expected: false },
        { args: function() {}, type: 'function', expected: false }
    ];
    
    tests.forEach( function( test ) {
        
        it( `should return ${ test.expected } when the value is a ${ test.type }`, function() {
            
            assert.equal( test.expected, isNodeList( test.args ) );
            
        } );
        
    } );
    
} );