/**
 * @function
 * Determines whether the supplied element is an array.
 * @param el - The element to check.
 * @returns {Boolean} - Whether the element is an array
 */
export default function isFunction( el ) {
    return !!( el && el.constructor && el.call && el.apply );
}