var assert = require('assert');

import Handler from '../../src/components/handler';


describe( 'Handler', function() {
    
    before( function() {
        
        global.Image = function() {}
        
        this.image = { getAttribute: function() { return '' }, className: '' };
            
    } );
    
    describe( '#getElements( els )', function() {
        
        var tests = [
            { args: [], type: 'array', expected: [] },
            { args: function() { return []; }, type: 'function', expected: [] },
            { args: {}, type: 'object', expected: [{}] },
        ];
        
        tests.forEach( function( test ) {
            
            it( `should return an array when given a ${test.type}`, function() {
                
                var handler = new Handler( { els: [] } );
                
                assert.deepEqual( test.expected, handler.getElements( test.args ) );
                
            } );
            
        } );
        
    } );
    
    describe( '#init()', function() {
        
        it( 'should create and add a list of watchers to the handler', function() {
            
            var images = [ this.image, this.image, this.image, this.image, this.image ];
            
            var handler = new Handler( { els: images } ).init();
            
            assert.equal( 5, handler.watchers.length );
            assert.equal( true, handler.watchers[0].hasLoaded !== undefined );
            
        } );
        
    } );
    
});