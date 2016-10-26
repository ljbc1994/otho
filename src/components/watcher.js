import { removeClass, addClass } from '../utils/style-manipulation';

/*
 *
 */
export default class Watcher {
    
    /*
     *
     */
    constructor({
        el,
        error,
        placehold,
        loaded,
        failed,
        imageLoaded,
        imageLoading
    }) {
        
        this.el = el;
        
        this.error = error || this.el.getAttribute( 'data-error' );
        this.placehold = placehold || this.el.getAttribute( 'data-placehold' );
        
        this.loaded = loaded;
        this.failed = failed;
        
        this.toLoad = this.el.src;
        this.imageLoaded = imageLoaded;
        this.imageLoading = imageLoading;
        this.hasLoaded = false;
        this.init();
        
    }
    
    /*
     *
     */
    init() {
        
        addClass( this.el, this.imageLoading );
        
        this.el.src = this.placehold;
        
        this.pseudo = new Image();
        this.pseudo.onload = this._loaded.bind( this );
        this.pseudo.onerror = this._error.bind( this );
        this.pseudo.src = this.toLoad;
        
    }
    
    /*
     *
     */
    _loaded() {
        
        this.el.src = this.pseudo.src;
        
        removeClass( this.el, this.imageLoading );
        addClass( this.el, this.imageLoaded );
        
        this.hasLoaded = true;
        
        this.loaded( this );
        
    }
    
    /*
     *
     */
    _error() {
        
        this.el.src = this.error;
        
        removeClass( this.el, this.imageLoading );
        
        this.failed( this );
        
    }
    
}