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
    
    describe( '#_imageLoaded( watcher )', function() {
        
        it( 'should trigger the loaded callback with the loaded watcher when executed', function(done) {
            
            var self = this;
            
            var handler = new Handler( { 
                
                els: [ self.image ],
                
                loaded: function( watcher ) {
                
                    assert.equal( self.image, watcher.el );
                
                    done();
                    
                }
                
            } );
            
            handler.init();
            
            handler._imageLoaded( { el: self.image } );
            
        } );
        
        /* Correct progress values should be split into separate test cases */
        it( 'should trigger the progress callback with the correct progress values when executed', function(done) {
            
            var self = this;
            
            var handler = new Handler( { 
                
                els: [ self.image ],
                
                progress: function( watcher, progress ) {
                
                    assert.equal( self.image, watcher.el );
                    assert.equal( 1, progress.total );
                    assert.equal( 1, progress.loaded );
                    assert.equal( 100, progress.percent );
                    
                    done();
                    
                }
                
            } );
            
            handler.init();
            
            handler.watchers = [ { hasLoaded: true } ];
            
            handler._imageLoaded( { el: self.image } );
            
        } );
        
        it( 'should trigger the images successful callback with the correct number of watchers', function(done) {
            
            var self = this;
            
            var handler = new Handler( { 
                
                els: [ self.image ],
                
                success: function( watchers ) {
                    
                    assert.equal( 1, watchers.length );
                    
                    done();
                    
                }
                
            } );
            
            handler.init();
            
            handler.watchers = [ { hasLoaded: true } ];
            
            handler._imageLoaded( { el: self.image } );
            
        } );
        
    } );
    

    describe( '#_imageFailed( watcher )', function() {
       
        it( 'should trigger the fail callback when executed', function(done) {
            
            var self = this;
            
            var handler = new Handler( { 
                
                els: [ self.image ],
                
                fail: function( watcher ) {
                    
                    assert.equal( self.image, watcher.el );
                    
                    done();
                    
                }
                
            } );
            
            handler.init();
            
            handler._imageFailed( { el: self.image } );
            
        } );
        
    });
    
    describe( '#_imagesSuccess( watcher )', function() {
       
        it( 'should trigger the success callback when executed', function(done) {
            
            var self = this;
            
            var handler = new Handler( { 
                
                els: [ self.image ],
                
                success: function( watchers ) {
                    
                    assert.equal( 1, watchers.length );
                    
                    done();
                    
                }
                
            } );
            
            handler.init();
            
            handler.watchers = [ { el: self.image } ];
            
            handler._imagesSuccess();
            
        } );
        
    });
    
});