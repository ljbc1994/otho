import DeferredImage from '../../src/components/deferred-image';

var assert = require('assert');

describe( '#constructor( { src, loaded, failed } )', function() {
   
    it( 'should set the properties of the deferred image object', function() {

        let options = {
			src: 'http://placehold.it/200x200',
			loaded: () => 'loaded',
			failed: () => 'failed'
		};
		
		let image = new DeferredImage( options ); 
		
		assert( options.src, image.src );
		assert( options.loaded, image._loaded );
		assert( options.failed, image._failed );
		
    } );
    
} );

describe( '#init()', function() {
	
	it( 'should trigger the loaded callback if the image has loaded', function( done ) {
		
		let options = {
			src: 'http://placehold.it/200x200',
			loaded: ( e ) => {
				assert( {}, e );
				done();
			}
		};
		
		let image = new DeferredImage( options );
		
	} );
	
	it( 'should trigger the error callback if the image cannot be loaded', function( done ) {
		
		let options = {
			src: 'http://this.will.not.work',
			failed: ( e ) => {
				assert( {}, e );
				done();
			}
		};
		
		let image = new DeferredImage( options );
		
	} );
	
} );

describe( '#wait( src, loaded )', function() {
	
	it( 'should execute the loaded callback if all the deferred images have been loaded', function( done ) {
		
		let images = [ 
			'http://placehold.it/200x200',
			'http://placehold.it/250x250',
			'http://placehold.it/300x300'
		];
		
		DeferredImage.wait( images, ( loaded ) => {
			
			assert( 3, loaded.length );
			
			done();
			
		} );
		
	} );
	
	it( 'should execute the loaded callback if all the deferred images have loaded or failed', function( done ) {
		
		let images = [
			'http://placehold.it/200x200',
			'http://this.will.not.work',
			'http://placehold.it/250x250'
		];
		
		DeferredImage.wait( images, ( loaded ) => {
			
			assert( 3, loaded.length );
			
			done();
			
		} );
		
	} );
	
	it( 'should execute the loaded callback if a single deferred image is specified', function( done ) {
		
		let image = 'http://placehold.it/200x200';
		
		DeferredImage.wait( image, ( loaded ) => {
			
			assert( 1, loaded.length );
			
			done();
			
		} );
		
	} );
	
} );