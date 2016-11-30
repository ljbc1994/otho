/**
 * @function
 * Determines whether the supplied element is an image.
 * @param el - The element to check.
 * @returns {Boolean} - Whether the element is an image
 */
export default function isImage( el ) {
    
    return el.nodeName.toLowerCase() === 'img';
    
}