import isImage from '../../src/utils/is-image';

var assert = require('assert');

describe( '#isImage( el )', function() {
    
    var tests = [
        { args: { nodeName: 'Img' }, expected: true },
        { args: { nodeName: 'img' }, expected: true },
        { args: { nodeName: 'div' }, expected: false },
        { args: { nodeName: '' }, expected: false }
    ];
    
    tests.forEach( function( test ) {
        
        it( `should return ${ test.expected } when the node name is ${ test.args.nodeName }`, function() {
            
            assert.equal( test.expected, isImage( test.args ) );
            
        } );
        
    } );
    
} );