export function addClass( el /* , classes to add */ ) {
    
    let toAdd = Array.prototype.slice.call( arguments, 1 );
    let classes = el.className.split( ' ' );
    
    el.className = classes
        .concat( toAdd )
        .join( ' ' )
        .trim();
    
}

export function removeClass( el /*, classes to remove */ ) {
    
    let toRemove = Array.prototype.slice.call( arguments, 1 );
    
    el.className = el.className
        .split( ' ' )
        .filter( (className) => toRemove.indexOf( className ) === -1 )
        .join( ' ' )
        .trim();
    
}