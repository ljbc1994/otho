/**
 * @function
 * See https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/ for full description.
 * @param {Object} arguments - List of objects that need to be extended.
 * @returns {Object} - Extended object
 */
export default function extend() {
    
    var extended = {},
          deep = false,
          i = 0,
          length = arguments.length;
    
    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
    
        deep = arguments[0];
        i++;
    
    }
    
    var merge = function (obj) {
        
        for ( var prop in obj ) {
            
            if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                
                if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                    
                    extended[prop] = _helper.extend( true, extended[prop], obj[prop] );
                
                } else {
                    
                    extended[prop] = obj[prop];
                
                }
                
            }
            
        }
        
    };
    
    for ( ; i < length; i++ ) merge( arguments[i] );
    
    return extended;
    
}