// Kudos to https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
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