/**
 * @function
 * Checks whether the browser supports native promises.
 * @returns {Boolean} - Whether the browser supports native promises.
 */
function hasNativeSupport() {
    return typeof Promise !== "undefined" && Promise.toString().indexOf( "[native code]" ) !== -1;
}

/**
 * @Object
 * Checks whether variants of promises are supported and returns
 * that promise with an instance if it's native as well as the
 * promise object.
 * Supports:
 *  - Native implementations and the Bluebird library
 *  - jQuery / Zepto implementations
 *  - Kris Kowal's Q implementation
 * Notes: Check whether the promise is an A+ implementation.
 * @returns {Object} - An instance of the promise as well as
 * the promise object.
 */
export default ( function getSupportedPromise() {
    
    let _Promise, lib;
    
    if ( hasNativeSupport() ) {
        
        _Promise = Promise; 
        
    } else if ( ( lib = window.jQuery || window.Zepto ) && lib.promise !== null ) {
        
        _Promise = lib.promise;
        
    } else if ( window.Q !== null ) {
        
        _Promise = window.Q;
        
    }
    
    if ( _Promise !== null ) {
        
        return {
        
            instance: ( fn ) => hasNativeSupport() ? new _Promise( fn ) : _Promise( fn ),
        
            type: _Promise
        
        };
        
    } else {
        
        return undefined;
        
    }
    
} )();