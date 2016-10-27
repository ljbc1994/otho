/**
 * @function
 * Determines whether the supplied element is a function.
 * @param el - The element to check.
 * @returns {Boolean} - Whether the element is an function
 */
export default function isFunction( el ) {
    return !!( el && el.constructor && el.call && el.apply );
}