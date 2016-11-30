var assert = require('assert');

import extend from '../../src/utils/extend';


describe( '#extend()', function() {
   
    beforeEach(function() {
        
        this.defaultOptions = {
            prop: 'foo',
            obj: {
                prop: 'bar'
            }
        };
        
    });
    
    it( 'should replace the default object\'s properties with new object\'s properties', function() {

        let obj = extend( this.defaultOptions, { prop: 'bar', obj: { prop: 'foo' } } );
        
        assert( 'bar', obj.prop );
        assert( 'foo', obj.obj.prop );
        
    } );
    
} );