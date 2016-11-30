var assert = require('assert');

import { findChildrenImages, findClosestImage } from '../../src/utils/dom-traversal';


describe('Dom Traversal', function() {
    
    beforeEach(function() {
        
        this.mockDOMElement = {
            nodeName: 'div',
            childNodes: [
                { nodeName: 'img', childNodes: [], _id: 1 },
                { nodeName: 'div', childNodes: [], _id: 2 }
            ]
        };
        
    } );
    
    describe( '#findChildrenImages( el )', function() {
   
        it( 'should return an image when the parent element has a child image', function() {
            
            let images = findChildrenImages( this.mockDOMElement );
            
            assert.equal( 1, images.length );
            assert.equal( 'img', images[0].nodeName );
            
        } );
        
        it( 'should return multiple images when the parent element has child images', function() {
            
            this.mockDOMElement.childNodes[1].childNodes.push( { nodeName: 'img', childNodes: [] } );
            
            let images = findChildrenImages( this.mockDOMElement );
            
            assert.equal( 2, images.length );
            
        } );
        
        it( 'should not return an image when the parent element has no child images', function() {
            
            let images = findChildrenImages( { nodeName: 'div', childNodes: [] } );
            
            assert.equal( 0, images.length );
            
        } );
        
    } );

    describe( '#findClosestImage( el )', function() {

        it( 'should return the first child image of the parent element', function() {
            
            this.mockDOMElement.childNodes[1].childNodes.push( { nodeName: 'img', childNodes: [], _id: 3 } );
            
            let image = findClosestImage( this.mockDOMElement );
            
            assert.equal( 1, image._id );
            
        } );
        
        it( 'should return null if no child images can be found from the parent element', function() {
            
            let image = findClosestImage( { nodeName: 'div', childNodes: [] } );
            
            assert.equal( null, image );
            
        } );

    } );
    
} );