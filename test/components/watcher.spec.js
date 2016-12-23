import extend from '../../src/utils/extend';
import Watcher from '../../src/components/watcher';

var assert = require('assert');


let getDefaultOptions = () => ( {
	el: document.createElement( 'img' ),
	error: 'http://placehold.it/300x300',
	background: false,
	placehold: 'http://placehold.it/200x200',
	imageLoaded: 'i-have-loaded',
	imageLoading: 'i-am-loading',
	loaded: () => 'loaded',
	failed: () => 'failed'
} );


//describe( '#constructor( ... )', function() {
//   
//    it( 'should set the properties of the watcher using an object', function() {
//
//		let options = {
//			el: document.createElement( 'img' ),
//			error: 'http://placehold.it/300x300',
//			background: true,
//			placehold: 'http://placehold.it/200x200',
//			imageLoaded: 'i-have-loaded',
//			imageLoading: 'i-am-loading',
//			loaded: () => 'loaded',
//			failed: () => 'failed'
//		};
//		
//		let watcher = new Watcher( options );
//		
//		Object.keys( options ).forEach( ( key ) => {
//			
//			assert( options[ key ], watcher[ key ] );
//			
//		} );
//                
//    } );
//	
//	it( 'should set the properties of the watcher using the element attributes', function() {
//		
//		let options = [ 'error', 'background', 'placehold', 'loaded', 'loading' ];
//		
//		let elAttrs = {
//			'data-o-error': 'http://placehold.it/300x300',
//			'data-o-background': true,
//			'data-o-placehold': 'http://placehold.it/200x200',
//			'data-o-loaded': 'i-have-loaded',
//			'data-o-loading': 'i-am-loading'
//		};
//		
//		let el = document.createElement('img');
//		
//		Object.keys( elAttrs ).forEach( ( key ) => {
//			
//			el.setAttribute( key, elAttrs[ key ] );
//			
//		} );
//		
//		let watcher = new Watcher( {
//			el: el,
//			error: 'http://placehold.it/250x250',
//			bacground: false,
//			placehold: 'http://placehold.it/250x250',
//			loaded: () => 'loaded',
//			failed: () => 'failed'
//		} );
//		
//		options.forEach( ( option ) => {
//			
//			assert( elAttrs[ `data-o-${option}` ], watcher[ option ] );
//			
//		} );
//		
//	} );
//	
//} );
//
//*
// * @Note: These test names are too *technical*
// 
//describe( '#init( reinit )', function() {
//	
//	beforeEach(function() {
//		
//		this.src = 'http://placehold.it/600x600';
//		
//		this.options = getDefaultOptions();
//		
//		this.options.el.setAttribute( 'data-o-src', this.src );
//		
//	});
//	
//	it( 'should initialise the watcher by setting the initial properties', function() {
//		
//		let watcher = new Watcher( this.options );
//		
//		watcher.init();
//		
//		assert( this.src, watcher.toLoad );
//		assert( this.src, watcher.pseudo.src );
//		
//	} );
//	
//	it( 'should reinitialise the watcher by setting the loading class and deferred image', function() {
//		
//		let watcher = new Watcher( this.options );
//		
//		watcher.init( true );
//		
//		let elClass = watcher.el.className;
//		
//		assert( 'undefined', this.toLoad );
//		assert( this.options.imageLoading, elClass.indexOf( this.options.imageLoading ) !== -1 );
//		
//	} );
//	
//} );
//
//describe( '#_setup()', function() {
//	
//	beforeEach(function() {
//		
//		this.src = 'http://placehold.it/600x600';
//		
//		this.options = getDefaultOptions();
//		
//		this.options.el.setAttribute( 'data-o-src', this.src );
//		
//	});
//	
//	it( 'should set / reset the initial properties of the watcher', function() {
//		
//		this.options.el.className = `${this.options.imageLoaded} ${this.options.imageLoading}`;
//		
//		let watcher = new Watcher( this.options );
//		
//		watcher._setup();
//		
//		assert( watcher.el.className === '' );
//		assert( true, watcher.inView !== 'undefined' );
//		assert( true, watcher.hasLoaded !== 'undefined' );
//		assert( true, watcher.hasBackground !== 'undefined' );
//		
//	} );
//	
//} );
//
//describe( '#_getElement( el )', function() {
//	
//	beforeEach(function() {
//		
//		this.options = getDefaultOptions();
//		
//	});
//	
//	it( 'should set the element\'s image to the element', function() {
//		
//		let watcher = new Watcher( this.options );
//		
//		watcher._getElement( this.options.el );
//		
//		assert( this.options.el, watcher.img );
//		
//	} );
//	
//	it( 'should set the element\'s image to the element if the background option is set', function() {
//		
//		this.options.background = true;
//		this.options.el = document.createElement( 'div' );
//		
//		let watcher = new Watcher( this.options );
//		
//		watcher._getElement( this.options.el );
//		
//		assert( this.options.el, watcher.img );
//		
//	} );
//	
//	it( 'should set the element\'s image to the nearest child image', function() {
//		
//		let el =  document.createElement( 'div' );
//		let img = document.createElement( 'img' );
//		
//		el.appendChild( img );
//		
//		this.options.el = el;
//		
//		let watcher = new Watcher( this.options );
//		
//		watcher._getElement( this.options.el );
//		
//		assert( img, watcher.img );
//		
//	} );
//	
//} );
//
//describe( '#_setImage( src )', function() {
//	
//	beforeEach(function() {
//		
//		this.options = getDefaultOptions();
//		
//	});
//	
//	it( 'should set the image element\'s src to the specified src', function() {
//		
//		let src = 'http://placehold.it/200x200';
//		
//		let watcher = new Watcher( this.options );
//		
//		watcher._getElement( this.options.el );
//		watcher._setImage( src );
//		
//		assert( src, watcher.img.src );
//		
//	} );
//	
//	it( 'should set the element\'s background image to the specified src', function() {
//		
//		let src = 'http://placehold.it/200x200';
//		
//		this.options.el = document.createElement( 'div' );
//		this.options.background = true;
//		
//		let watcher = new Watcher( this.options );
//		
//		watcher._getElement( this.options.el );
//		watcher._setImage( src );
//
//		assert( watcher.el.style.backgroundImage, src );
//		
//	} );
//	
//} );
//
//describe( '#_getImage()', function() {
//	
//	beforeEach( function() {
//		
//		this.options = getDefaultOptions();
//		
//	} );
//	
//	it( 'should get the src of the image', function() {
//		
//		let src = 'http://placehold.it/200x200';
//		
//		let watcher = new Watcher( this.options );
//		
//		watcher._getElement( this.options.el );
//		watcher._setImage( src );
//		
//		assert( src, watcher._getImage() );
//		
//	} );
//	
//	it( 'should get the background image src of the element', function() {
//		
//		let src = 'http://placehold.it/200x200';
//		
//		this.options.el = document.createElement( 'div' );
//		this.options.background = true;
//		
//		let watcher = new Watcher( this.options );
//		
//		watcher._getElement( this.options.el );
//		watcher._setImage( src );
//		
//		assert( src, watcher._getImage() );
//		
//	} );
//	
//} );

describe( '#_loaded()', function() {
	
	beforeEach(function() {
		
		this.options = getDefaultOptions();
			
	});
	
	it( 'should execute the loaded callback and set the element\'s image as the desired src', function( done ) {
		
		let src = 'http://placehold.it/200x200', self = this;
		
		this.options.el.setAttribute( 'data-o-src', src );
		
		this.options.loaded = function( e ) {
			
			assert( src, e.img.src );
			assert( true, e instanceof Watcher );
			
			done();
			
		};
		
		let watcher = new Watcher( this.options );
		
		watcher.init();
		
	} );
	
} );

describe( '#_error()', function() {
	
	beforeEach(function() {
		
		this.options = getDefaultOptions();
			
	});
	
	it( 'should execute the failed callback and set the element\'s image as the error src', function( done ) {
		
		let src = 'http://this.will.not.work', self = this;
		
		this.options.el.setAttribute( 'data-o-src', src );
		
		this.options.failed = function( e ) {
			
			assert( self.options.error, e.img.src );
			assert( true, e instanceof Watcher );
			
			done();
			
		};
		
		let watcher = new Watcher( this.options );
		
		watcher.init();
		
	} );
	
} );

