/**
 * @function
 * Determines whether the supplied element is visible in the view.
 * @param el - The element to check.
 * @returns {Boolean} - Whether the element is in the view.
 */
export default function inView( el ) {
    
    let rect = el.getBoundingClientRect();
    let doc = document.documentElement;
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || doc.clientHeight) &&
        rect.right <= (window.innerWidth || doc.clientWidth)
    );
    
}