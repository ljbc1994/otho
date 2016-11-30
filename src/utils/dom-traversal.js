import isImage from './is-image';

/**
 * @function
 * Find all descendent images of the element
 * @param el - The element to check.
 * @returns {Array} - An array of descendent images
 */
function findChildrenImages( el ) {
    
    let _images = [];
  
    ( function _find( el ) {
        
        if ( isImage( el ) ) {
            
            return _images.push( el );
        
        }
           
        return Array.prototype.slice.apply( el.childNodes ).forEach( _find );
        
    } )( el );
    
    return _images;
    
}

/**
 * @function
 * Find all descendent images of the element and 
 * return the first image found.
 * @param el - The element to check.
 * @returns {Object|null} - The image or, if none 
 * found, null.
 */
function findClosestImage( el ) {
    
    let _images = findChildrenImages( el );
    
    return _images.length ? _images[0] : null;
    
}

export { findChildrenImages, findClosestImage };