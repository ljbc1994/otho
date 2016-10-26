import { Watcher } from './watcher';
import { isArray } from '../utils/is-array';
import { isFunction } from '../utils/is-function';

/*
 *
 */
export default class Handler {
    
    /*
     *
     */
    constructor( { 
        els,
        error,
        placehold,
        forcePlacehold,
        imageLoaded,
        imageLoading       
    } ) {
        
        this.els = isArray( els ) ? els : isFunction( els ) ? els.call( this ) : [ els ];    
        
        this.error = error;
        this.placehold = placehold;
        this.forcePlacehold = forcePlacehold;
        
        this.imageLoaded = imageLoaded;
        this.imageLoading = imageLoading;
        
        this.watchers = [];
        this.fail = function() { };
        this.loaded = function() { };
        this.success = function() { };
        this.progress = function() { };
        
    }
    
    /*
     *
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
    
    /*
     *
     */
    _imageLoaded( watcher ) {
        
        let self = this;
        let toLoad = self.watchers.length;
        let haveLoaded = self.watchers.filter( ( watcher ) => watcher.hasLoaded ).length;
        
        self.loaded( watcher );
        
        self.progress( watcher, { total: toLoad, loaded: haveLoaded } );
        
        if ( toLoad === haveLoaded ) {
            
            self._imagesSuccess();
            
        }
        
    }
    
    /*
     *
     */
    _imageFailed( watcher ) {
        
        let self = this;
        
        self.fail ( watcher );
        
    }

    /*
     *
     */
    _imagesSuccess() {
        
        let self = this;
        
        self.success( self.watchers );
        
    }
    
    /*
     *
     */
    success( cb, ctx ) {
        
        this.success = cb.bind( ctx || this );
        
        return this;
        
    }
    
    /*
     *
     */
    fail( cb, ctx ) {
        
        this.fail = cb.bind( ctx || this );
        
        return this;
        
    }
    
    /*
     *
     */
    progress( cb, ctx ) {
        
        this.progress = cb.bind( ctx || this );
        
        return this;
        
    }
    
}