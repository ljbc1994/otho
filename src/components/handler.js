import Watcher from './watcher';
import DeferredImage from './deferred-image';
import OthoPromise from '../utils/promise';

import { syncOptions } from '../config/options';
import isArray from '../utils/is-array';
import isFunction from '../utils/is-function';
import isNodeList from '../utils/is-node-list';
import extend from '../utils/extend';

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
        sync,
        inView,
        background,
        success,
        fail,
        progress,
        loaded
    } ) {
        
        this.els = this._getElements( els ); 
        
        this.watchers = [];
        
        // Image src for placehold or if error occurs.
        this.error = error;
        this.placehold = placehold;
        
        this.inView = inView;
        this.background = background;
        this.forcePlacehold = forcePlacehold;
        
        // Classes to add to the image / holder.
        this.imageLoaded = imageLoaded;
        this.imageLoading = imageLoading;
        
        // Callback functions.
        this.fail = fail || function() { };
        this.loaded = loaded || function() { };
        this.success = success || function() { };
        this.progress = progress || function() { };
        
        if ( typeof sync === 'object' ) {
            
            this.sync = extend( syncOptions, sync );
         
        }
        
    }
    
    /**
     * @function
     * Ensures different types of elements are outputted as an array.
     * @param {Array|Function|Object} els - Elements that are either holders or elements.
     * @returns {Array} - An array of images / holders.
     */
    _getElements( els ) {
        
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
     * Create the watchers with default configuration,
     * note this can be overidden by "data-o" attributes on
     * the watcher's element.
     * @returns {Promise|Array<Object>} 
     */
    init() {
        
        this._attachWatchers();
                
        // Ensure that the placehold and error images are loaded before loading the other images.
        if ( this.forcePlacehold && ( this.placehold || this.error ) ) {
            
            let cb = OthoPromise !== undefined ? function() {} : this._initWatchers.bind( this );
            
            let finished = DeferredImage.wait( [ this.error, this.placehold ], cb );
            
            if ( OthoPromise !== undefined ) {
                
                return finished.then( this._initWatchers.bind( this ) );
                
            }
            
        }
        
        if ( this.sync ) {
            
            return this._syncWatchers();
            
        }
        
        return this._initWatchers();
        
    }
    
    /**
     * @function
     * Create the watchers with settings, note this 
     * can be overidden by "data-o" attributes on
     * the watcher's element.
     */
    _attachWatchers() {
        
        let self = this;
        
        for ( let i = 0; i < self.els.length; i++ ) {
           
            let watcher = new Watcher( {
                el: self.els[ i ],
                error: self.error,
                placehold: self.placehold,
                imageLoaded: self.imageLoaded,
                imageLoading: self.imageLoading,
                background: self.background,
                loaded: self._imageLoaded.bind( self ),
                failed: self._imageFailed.bind( self ),
                success: self._imagesSuccess.bind( self )
            } );
               
            self.watchers.push( watcher );
           
        }
        
    }
    
    /**
     * @function 
     * Initialise the watchers to show the placeholder and
     * load the images. 
     * @returns {Promise|Array<Object>} A promise that waits for the watcher
     * instances to resolve or an array of watchers.
     */
    _initWatchers() {
        
        let watcherInstances = this.watchers.map( ( watcher ) => {
            
            return this.inView ? watcher.watchView() : watcher.init();
            
        } );
            
        if ( OthoPromise !== undefined ) {
            
            return OthoPromise.type.all( watcherInstances );
            
        }
        
        return watcherInstances;
        
    }
    
    /**
     * @function 
     * Initialise the watchers synchronously.
     */
    _syncWatchers() {
        
        let self = this;
        let { perLoad } = self.sync;
        let index = 1;
        let maxIndex = Math.ceil( self.watchers.length / perLoad );
        
        self.watchers.map( ( watcher ) => watcher._setup() );
        
        Watcher.queue( self.watchers.slice( 0, perLoad ), function nextWatcher() {
            
            index++;
            
            if ( index <= maxIndex ) {
                
                Watcher.queue( self.watchers.slice( perLoad * ( index - 1 ), perLoad * index ), nextWatcher );
                
            }
            
        } );
        
    }
    
    /**
     * @function 
     * Called when an image has been loaded, computes the
     * progress of the watchers as well as firing other
     * callbacks.
     * @param {Object::Watcher} watcher - The object that listens to the image status.
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
     * @param {Object::Watcher} watcher - The object that listens to the image status.
     */
    _imageFailed( watcher ) {
        
        let self = this;
        
        self.fail ( watcher );
        
        self._watchUpdates();
        
    }
    
    /**
     * @function
     * Called when all of the images have been loaded, and fires
     * a callback.
     * @param {Object::Watcher} watcher - The object that listens to the image status.
     */
    _imagesSuccess() {
        
        let self = this;
        
        self.success( self.watchers );
        
        self._watchUpdates();
        
    }
    
    _watchUpdates() {
        
        let self = this;
        
        window.addEventListener( 'resize', function() {
            
            self.watchers
                .filter( ( watcher ) => watcher.hasBackground && watcher.hasChanged() )
                .forEach( ( watcher ) => watcher.updateBackground() );
            
        } );
        
    }
    
    /**
     * @function
     * Manually trigger updating images whose source that has changed, intended
     * for use if the website has altered the src of an image.
     */
    update() {
        
        this.watchers
            .filter( ( watcher ) => watcher.toLoad !== watcher.img.src && !watcher.hasBackground )
            .forEach( ( watcher ) => watcher.init() );
        
    }
    
}