/**
 * @object
 * Default options for the handler.
 */
let defaultOptions = {
    els: document.getElementsByTagName('img'),
    
    error: '',
    placehold: '',
    
    forcePlacehold: false,
    inView: false,
    background: false,
    sync: false,
    
    imageLoaded: 'o-image-loaded',
    imageLoading: 'o-image-loading'
};

/**
 * @object
 * Default options for synchronous image 
 * loading.
 */
let syncOptions = {
    perLoad: 1
};

export { defaultOptions, syncOptions };