var Promise = require( 'promise' );

function Mac(buildDir) {
	
	this.checkEnv = function(spawn) {
		return new Promise( function( reslove, reject ) {
			reslove(); 
		});
	};

	this.build = function(spawn) {
		return spawn( 'make', [ '-j', '8' ] )
		.then( function() {
			spawn( 'make', [ 'install' ] );
		});
	}; 

	this.configure = function(spawn) {
		return spawn(
			'./configure', 
			[ 	
				'-no-xcb',
				'-opensource',
				'-confirm-license',
				'--prefix=' + buildDir
			]); 
	};

	this.clean = function(spawn) {
		return spawn( 'make', [ 'clean' ] );
	};
}; 

module.exports = Mac;