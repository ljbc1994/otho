module.exports = function(config) {
	
  config.set({

    basePath: '',

    frameworks: [ 'mocha', 'browserify' ],

    files: [
	  'src/utils/*.js', 'src/components/*.js',
      'test/utils/*.spec.js', 'test/components/*.spec.js'
    ],
	  
	preprocessors: {
	   'src/**/*.js': [ 'browserify' ],
	   'test/**/*.js': [ 'browserify' ],
	},
	  
	browserify: {
		configure: (bundle) => {
			bundle.once( 'prebundle', () => {
				bundle.transform( 'babelify', { presets: [ 'es2015' ] } );
			} );
		}
	},
	  
    exclude: [],

    reporters: [ 'progress', 'coverage' ],
	  
    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,
	  
    browsers: [ 'Chrome', 'IE', 'IE9', 'IE10', 'Firefox' ],
	  
	customLaunchers: {
	  IE9: {
		base: 'IE',
		'x-ua-compatible': 'IE=EmulateIE9'
	  },
	  IE10: {
		base: 'IE',
		'x-ua-compatible': 'IE=EmulateIE10'
	  }
	},
	  
    singleRun: true,

    concurrency: Infinity
	  
  })
  
}
