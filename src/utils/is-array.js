/**
 * @function
 * Determines whether the supplied element is an array.
 * @param el - The element to check.
 * @returns {Boolean} - Whether the element is an array
 */
export default function isArray( el ) {
    return Object.prototype.toString.call( el ) === '[object Array]';
}