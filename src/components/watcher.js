import { removeClass, addClass } from '../utils/style-manipulation';

/**
 * @class
 * Watches the status of the image load, manipulating the
 * associated element and firing callbacks depending on the
 * image's status.
 */
export default class Watcher {
    
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
        imageLoading
    } ) {
        
        this.el = el;
        
        this.error = this.el.getAttribute( 'data-o-error' ) || error;
        this.placehold = this.el.getAttribute( 'data-o-placehold' ) || placehold;
        this.imageLoaded = this.el.getAttribute( 'data-o-loaded' ) || imageLoaded;
        this.imageLoading = this.el.getAttribute( 'data-o-loading' ) || imageLoading;
        
        this.loaded = loaded;
        this.failed = failed;
        
        this.toLoad = this.el.src;
        this.hasLoaded = false;
        this.init();
        
    }
    
    /**
     * @function
     * Indicate that the image is loading, swap out the image's
     * src for the specified placeholder src and defer loading of 
     * the image to an Image object.  
     */
    init() {
        
        addClass( this.el, this.imageLoading );
        
        this.el.src = this.placehold;
        
        this.pseudo = new Image();
        this.pseudo.onload = this._loaded.bind( this );
        this.pseudo.onerror = this._error.bind( this );
        this.pseudo.src = this.toLoad;
        
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
        
        this.el.src = this.pseudo.src;
        
        this.hasLoaded = true;
        
        this.loaded( this );
        
    }
    
    /**
     * @function
     * The image has loaded unsuccesfully, swap out the image's 
     * placeholder src for the error src. Also, fire associated
     * callback. 
     */
    _error() {
        
        removeClass( this.el, this.imageLoading );
        
        this.el.src = this.error;
        
        this.failed( this );
        
    }
    
}