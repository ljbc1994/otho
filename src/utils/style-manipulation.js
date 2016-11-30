/**
 * @function
 * Add class(es) to an element.
 * Note: Could probably use rest params for this...
 * @param el - The element to add the class(es) to.
 * @param arguments - List of classes to add to the element.
 */
export function addClass( el /* , classes to add */ ) {
    
    let toAdd = Array.prototype.slice.call( arguments, 1 );
    let classes = el.className.split( ' ' );
    
    if ( toAdd.length === 0 ) {
        throw new Error( "You need to provide at least one class" );
    } 
    
    el.className = classes
        .concat( toAdd )
        .join( ' ' )
        .trim();
    
}

/**
 * @function
 * Remove class(es) from an element.
 * Note: Could probably use rest params for this...
 * @param el - The element to remove the class(es) from.
 * @param arguments - List of classes to remove from the element.
 */
export function removeClass( el /*, classes to remove */ ) {
    
    let toRemove = Array.prototype.slice.call( arguments, 1 );
    
    if ( toRemove.length === 0 ) {
        throw new Error( "You need to provide at least one class" );
    } 
    
    el.className = el.className
        .split( ' ' )
        .filter( (className) => toRemove.indexOf( className ) === -1 )
        .join( ' ' )
        .trim();
    
}

/**
 * @function
 * Get the background image of the element
 * @param el - The element to get the background image from.
 * @param style - The property of the element to retrieve.
 */
export function getBackgroundImage( el ) {
    
    let background = window.getComputedStyle( el, null ).getPropertyValue( 'background' );
    let urlIndex = ( background.indexOf( 'url(' ) + 4 );
    let endIndex = background.slice( urlIndex ).indexOf( ')' );
    
    return background
      .slice( urlIndex )
      .slice( 0, endIndex )
      .replace( /["|']/g, "" );
    
}

/**
 * @function
 * Set the background image of the element
 * @param el - The element to get the background image from.
 * @param style - The property of the element to retrieve.
 */
export function setBackgroundImage( el, src ) {
    
    el.style.backgroundImage = `url(${ src })`; 
    
}