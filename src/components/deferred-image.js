import OthoPromise from '../utils/promise';
import isArray from '../utils/is-array';

/**
 * @class
 * Handles loading the image and firing callbacks if the 
 * image has loaded or has failed. 
 */
export default class DeferredImage {
    
    /**
     * @function
     * Loops through array / link of image sources and creates
     * deferred images, firing the callback when all images
     * have finished loading or have errored out.
     * @param {String|Array<String>} - An array of image srcs.
     * @param {Function} - Callback function for when the image has loaded.
     * @returns {Promise|null} - Promise which resolves when all the images
     * have been loaded.
     */
    static wait( src, loaded ) {
        
        if ( !isArray( src ) ) {
            
            src = [ src ];
            
        }
            
        let noImages = src.length;
        let images = [];
        let usePromise = OthoPromise !== undefined;
        
        const _tempLoaded = () => {
                      
            noImages--;
            
            if ( noImages === 0 && !usePromise ) {
                
                loaded();
            
            }
                
        };
        
        for ( let i = 0; i < src.length; i++ ) {
            
            let deferred = new DeferredImage( {
                src: src[i],
                loaded: _tempLoaded.bind( this ),
                failed: _tempLoaded.bind( this )
            } );    
            
            if ( usePromise ) {
                
                images.push( deferred.$promise );
            
            }
                
        }
        
        return usePromise ? OthoPromise.type.all( images ) : null;
        
    }
    
    /**
     * @function
     * Initialising the configuration for the deferred image.
     * @param {Object} - The image src as well as callback methods.
     */
    constructor( {
        src,
        loaded,
        failed
    } ) {
        
        this.src = src;
        this.pseudo = new Image();
        this._loaded = loaded || function() {};
        this._failed = failed || function() {};
        
        this.init();
        
    }
    
    /**
     * @function
     * Load the image and fire when the image has loaded or
     * returned an error.
     */
    init() {
        
        let self = this;
        
        self.pseudo.src = this.src;
        
        self.pseudo.addEventListener( 'load', this._loaded );
        self.pseudo.addEventListener( 'error', this._failed );
        
        if ( OthoPromise !== undefined ) {
            
            this.$promise = OthoPromise.instance( ( resolve, reject ) => {

                self.pseudo.addEventListener( 'load', resolve );
                self.pseudo.addEventListener( 'error', reject );
                
            } );
            
        }
        
    }
    
}