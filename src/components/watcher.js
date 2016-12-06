import DeferredImage from './deferred-image';

import isArray from '../utils/is-array';
import isImage from '../utils/is-image';
import inView from '../utils/in-view';
import { findClosestImage } from '../utils/dom-traversal';
import { removeClass, addClass, getBackgroundImage, setBackgroundImage } from '../utils/style-manipulation';

/**
 * @class
 * Watches the status of the image load, manipulating the
 * associated element and firing callbacks depending on the
 * image's status.
 */
export default class Watcher {
    
    /**
     * @function
     * Initialise the array of watchers and when finished,
     * execute the callback. 
     * @param {Array|Object} watchers - A watcher or an array of watchers.
     * @param {Function} loaded - The callback to execute when finished. 
     */
    static queue( watchers, loaded ) {
        
        if ( !isArray( watchers ) ) {
            
            watchers = [ watchers ];
            
        }
        
        let noWatchers = watchers.length;

        const tempLoaded = () => {
                      
            noWatchers--;
            
            if ( noWatchers === 0 ) {
                
                loaded();
            
            }
                
        };
        
        for ( let i = 0; i < watchers.length; i++ ) {
            
            let currentWatcher = watchers[ i ];
            
            currentWatcher._any = tempLoaded.bind( this );
            
            // Watcher should already be setup before initialisation.
            currentWatcher.init( true );
            
        }
        
    }

    /**
     * @function
     * Initialising the configuration for the watcher.
     * @param {Object} - Defined options.
     */
    constructor( {
        el,
        error,
        placehold,
        loaded,
        failed,
        imageLoaded,
        imageLoading,
        background
    } ) {
        
        this.el = el;
        this.error = this.el.getAttribute( 'data-o-error' ) || error;
        this.background = this.el.getAttribute('data-o-background') || background;
        this.placehold = this.el.getAttribute( 'data-o-placehold' ) || placehold;
        this.imageLoaded = this.el.getAttribute( 'data-o-loaded' ) || imageLoaded;
        this.imageLoading = this.el.getAttribute( 'data-o-loading' ) || imageLoading;
        
        this.loaded = loaded;
        this.failed = failed;
        
    }
    
    /**
     * @function
     * Indicate that the image is loading, swap out the image's
     * src for the specified placeholder src and defer loading of 
     * the image to an Image object.
     * @param {Boolean} reinit - Whether to setup the watcher again.
     * @returns {Object} - The watcher.
     */
    init( reinit ) {
        
        if ( !reinit ) {
            
            this._setup();
        
        }
            
        addClass( this.el, this.imageLoading );
        
        this.pseudo = new DeferredImage( {
            src: this.toLoad,
            loaded: this._loaded.bind( this ),
            failed: this._error.bind( this )
        } );
        
        return this;
        
    }
    
    _setup() {
        
        this.pseudo = {};
        this.inView = false;
        this.hasLoaded = false;
        this.hasBackground = false;
        
        this._getElement( this.el );
        this.toLoad = this._getImage();
        this._setImage( this.placehold );
        
        removeClass( this.el, this.imageLoaded, this.imageLoading );
        
    }
    
    /**
     * @function
     * Check whether the element is visible within the view,
     * also, reevaluate whether the element is visible when
     * window is scrolled or resized.
     * @returns {Object|Promise} - The watcher or a promise.
     */
    watchView() {
        
        this._setup();
        
        window.addEventListener( 'scroll', this._onViewChange.bind( this ) );
        window.addEventListener( 'resize', this._onViewChange.bind( this ) );
        
        return this._onViewChange();
        
    }
    
    /**
     * @function
     * Check whether the image loaded has changed
     */
    hasChanged() {
        
        return this.toLoad !== getBackgroundImage( this.img );
        
    }
    
    /**
     * @function
     * Check whether the element is visible within the view,
     * and if so, initialise the watcher.
     * @returns {Object|Promise} - The watcher or a promise.
     */
    _onViewChange() {
        
        if ( !inView( this.el ) || this.inView ) {
            
            return;
            
        }
        
        // No need for listeners when image has loaded.
        window.removeEventListener( 'scroll', this._onViewChange.bind( this ) );
        window.removeEventListener( 'resize', this._onViewChange.bind( this ) );
        
        this.init( true );
        
        this.inView = true;
        
    }
    
    /**
     * @function
     * Determine whether the element contains an image or is just the
     * image itself and set the element's image to either the element
     * or the first child image.
     * @param {Object} el - The element
     */
    _getElement( el ) {
        
        this.img = ( isImage( el ) || this.background ) ? el : findClosestImage( el );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    }
    
    /**
     * @function
     * Set the image src of the element's image based on whether
     * it's a background image or an image element.
     * @params {String} src - The image src
     */
    _setImage( src ) {
        
        if ( this.background ) {
            
            setBackgroundImage( this.img, src );
            
        } else {
            
            this.img.src = src; 
            
        }
        
    }

    /**
     * @function
     * Get the image src of the element's image based on whether
     * it's a background image or an image element.
     * @returns {String} - The image src
     */
    _getImage() {
        
        return this.background ? getBackgroundImage( this.img ) : this.img.getAttribute( 'data-o-src' );
        
    }
    
    /**
     * @function
     * The image has loaded succesfully, swap out the image's 
     * placeholder src for the loaded src. Also, fire associated
     * callback. 
     */
    _loaded() {
        
        removeClass( this.el, this.imageLoading );
        addClass( this.el, this.imageLoaded );
        
        this._setImage( this.toLoad );
        
        this.hasLoaded = true;
        
        this.loaded( this );
        
        this._any( this );
        
    }
    
    /**
     * @function
     * The image has loaded unsuccesfully, swap out the image's 
     * placeholder src for the error src. Also, fire associated
     * callback. 
     */
    _error() {
        
        removeClass( this.el, this.imageLoading );
        
        this._setImage( this.error );
        
        this.hasLoaded = true;
        
        this.failed( this );
            
        this._any( this );
        
    }
    
    /**
     * TODO: Expand upon functionality, currently just for
     * the ^ static queue function.
     * @function
     * Executed whenever an image has been loaded or an 
     * error has been found.
     * @returns { Object::Watcher } Return this instance.
     */
    _any() {
        
        return this;
        
    }
    
}