import Watcher from './watcher';
import isArray from '../utils/is-array';
import isFunction from '../utils/is-function';
import isNodeList from '../utils/is-node-list';

/**
 * @class
 * Responsible for initialising the watchers, passing
 * through the configuration and ensuring user defined
 * callbacks are executed when necessary.
 */
export default class Handler {
    
    /**
     * @function
     * Initialising the configuration for the handler.
     * @param {Object} - amalgamation of default and user defined options.
     */
    constructor( { 
        els,
        error,
        placehold,
        forcePlacehold,
        imageLoaded,
        imageLoading,
        
        success,
        fail,
        progress,
        loaded
    } ) {
        
        this.els = this.getElements( els ); 
        
        // Image src for placehold or if error occurs.
        this.error = error;
        this.placehold = placehold;
        
        this.forcePlacehold = forcePlacehold;
        
        // Classes to add to the image / holder.
        this.imageLoaded = imageLoaded;
        this.imageLoading = imageLoading;
        
        this.watchers = [];
        
        // Callback functions.
        this.fail = fail || function() { };
        this.loaded = loaded || function() { };
        this.success = success || function() { };
        this.progress = progress || function() { };
           
    }
    
    /**
     * @function
     * Ensures different types of elements are outputted as an array.
     * @param {Array|Function|Object} els - Elements that are either holders or elements.
     * @returns {Array} - An array of images / holders.
     */
    getElements( els ) {
        
        if ( isArray( els ) ) {
            
            return els;
            
        } else if ( isFunction( els ) ) {
            
            return els.call( this );
            
        } else if ( isNodeList( els ) ) {
            
            return Array.prototype.slice.call( els, 0 );
            
        } else {
            
            return [ els ];
            
        }
            
    }
    
    /**
     * @function
     * Initialises the watchers with default configuration,
     * note this can be overidden by "data-o" attributes on
     * the watcher's element.
     * @returns {Object::Handler} Handler - Instance of the handler 
     */
    init() {
        
        let self = this;
        
        for ( let i = 0; i < self.els.length; i++ ) {
           
            let watcher = new Watcher( {
                el: self.els[ i ],
                error: self.error,
                placehold: self.placehold,
                imageLoaded: self.imageLoaded,
                imageLoading: self.imageLoading,
                loaded: self._imageLoaded.bind( self ),
                failed: self._imageFailed.bind( self ),
                success: self._imagesSuccess.bind( self )
            } );
               
            self.watchers.push( watcher );
           
        }
        
        return self;
        
    }
    
    /**
     * @function 
     * Called when an image has been loaded, computes the
     * progress of the watchers as well as firing other
     * callbacks.
     * @params {Object::Watcher} watcher - The object that listens to the image status.
     */
    _imageLoaded( watcher ) {
        
        let self = this;
        let toLoad = self.watchers.length;
        let haveLoaded = self.watchers.filter( ( watcher ) => watcher.hasLoaded ).length;
        
        self.loaded( watcher );
        
        self.progress( watcher, { 
            total: toLoad, 
            loaded: haveLoaded, 
            percent: Math.round( ( haveLoaded / toLoad ) * 100 ) 
        } );
        
        if ( toLoad === haveLoaded ) {
            
            self._imagesSuccess();
            
        }
        
    }
    
    /**
     * @function
     * Called when an image has failed to load, and fires
     * a callback.
     * @params {Object::Watcher} watcher - The object that listens to the image status.
     */
    _imageFailed( watcher ) {
        
        let self = this;
        
        self.fail ( watcher );
        
    }
    
    /**
     * @function
     * Called when all of the images have been loaded, and fires
     * a callback.
     * @params {Object::Watcher} watcher - The object that listens to the image status.
     */
    _imagesSuccess() {
        
        let self = this;
        
        self.success( self.watchers );
        
    }
    
}