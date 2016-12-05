import { defaultOptions } from './config/options';
import Handler from './components/handler';
import DeferredImage from './components/deferred-image';
import extend from './utils/extend';

/**
 * @function
 * Load Otho and parse through the user's options.
 * @param {Object} userOptions - The user defined options  
 * @returns {Array<Watcher>|Promise} - List of watchers and a promise containing watchers
 */
export function load( userOptions ) {
        
    let options = extend( defaultOptions, userOptions );

    return new Handler( options ).init();
        
}

/**
 * @function
 * Preload the specified images.
 * @param {Object|Array} images - The images to preload  
 * @param {Function} cb - The callback to execute when all
 * the specified images are preloaded.
 */
export function preload( images, cb ) {
    
    return DeferredImage.wait( images, cb );
    
}