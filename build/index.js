#!/usr/bin/env node

const fs = require('fs');
const pkg = require('../package.json');

/**
 * Header comment
 */
var head = 
`/**
  * Otho.js v${pkg.version}
  * Created by ${pkg.author} (@ljbc1994)
  * Released under the ${pkg.license} License.
  */
`;

/**
 * Project urls
 */
const project = {
    dist: './dist/otho.min.js'
};

/**
 * @function 
 * Adds a header comment to the packaged library
 */
function addHeader() {
    
    fs.readFile( project.dist, ( err, fileBuffer ) => {
    
        if ( err ) throw err;

        const headBuffer = new Buffer( head ),
              totalLength = headBuffer.length + fileBuffer.length,
              finalBuffer = Buffer.concat( [ headBuffer, fileBuffer ], totalLength );
    
        fs.writeFile( project.dist, finalBuffer, ( err, fd ) => {

            if ( err ) throw err;

            console.log( `\n Successfully added \n ${head} to the dist file. \n` );

        } );
    
    } );
    
}

addHeader();