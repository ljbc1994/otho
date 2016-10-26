import { removeClass, addClass } from '../utils/class-methods';
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
        failed
    }) {
        
        this.el = el;
        
        this.error = error;
        this.placehold = placehold;
        
        this.loaded = loaded;
        this.failed = failed;
        
        this.toLoad = this.el.src;
        this.hasLoaded = false;
        this.init();
        
    }
    
    /*
     *
     */
    init() {
        
        this.el.src = this.placehold;
        
        this.pseudo = new Image();
        
        addClass( this.el, this.imageLoading );
        
        this.pseudo.onload = this._loaded.bind( this ) 
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
        
        this.loaded( this );
        
    }
    
    /*
     *
     */
    _error() {
        
        this.el.src = this.error;
        
        removeClass( this.el, '' );
        
        this.failed( this );
        
    }
    
}