import isArray from './is-array';

/**
 * @function
 * Recursively flattens a n-dimensional array.
 * @param {Array} arrays - Nested array to flatten
 * @returns {Array} - Flattened array
 */
export default function flatten( arrays ) {
    
    if ( !isArray( arrays ) ) {
    
        return arrays;
        
    }
    
    return arrays.reduce( ( flat, toFlatten ) => {
        
        return flat.concat( isArray( toFlatten ) ? flatten( toFlatten ) : toFlatten );
        
    }, [] );
    
}