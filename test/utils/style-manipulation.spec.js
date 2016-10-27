var assert = require('assert');

import { addClass, removeClass } from '../../src/utils/style-manipulation';


describe( '#addClass( el )', function() {
    
    beforeEach(function() {
        
        var el = {
            className: ''
        };
        
        this.el = el;
        
    });
    
    it( 'should add a class to the element\'s classes', function() {
            
        addClass( this.el, 'example' );
        
        assert.equal( this.el.className, 'example' );
            
    } );
    
    it( 'should add a class to the element\'s classes without removing other classes', function() {
            
        this.el.className = 'stay';
        
        addClass( this.el, 'example' );
        
        assert.equal( this.el.className, 'stay example' );
            
    } );
    
    it( 'should add multiple classes to the element\'s classes', function() {
            
        addClass( this.el, 'example', 'example1' );
        
        assert.equal( this.el.className, 'example example1' );
            
    } );
    
    it( 'should throw an error if no classes are provided', function() {
            
        assert.throws( function() { addClass( this.el ); }, Error );
            
    } );
        
} );


describe( '#removeClass( el )', function() {
    
    beforeEach(function() {
        
        var el = {
            className: 'example'
        };
        
        this.el = el;
        
    });
    
    it( 'should remove a class from the element\'s classes', function() {
            
        removeClass( this.el, 'example' );
        
        assert.equal( this.el.className, '' );
            
    } );
    
    it( 'should remove a class from the element\'s classes without removing other classes', function() {
            
        this.el.className += ' stay';
        
        removeClass( this.el, 'example' );
        
        assert.equal( this.el.className, 'stay' );
            
    } );
    
    it( 'should remove multiple classes from the element\'s classes', function() {
            
        this.el.className = 'example example1';
        
        removeClass( this.el, 'example', 'example1' );
        
        assert.equal( this.el.className, '' );
            
    } );
    
    it( 'should throw an error if no classes are provided', function() {
            
        assert.throws( function() { removeClass( this.el ); }, Error );
            
    } );
        
} );

