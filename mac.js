function Mac(buildDir) {
	this.build = function(spawn) {
		return spawn( 'sudo', [ 'make', '-j', '8' ] ).then( function() {
			spawn( 'sudo', [ 'make', 'install' ] );
		}); 
	}; 

	this.configure = function(spawn) {
		return spawn( 
			'sudo', 
			[ 	
				"./configure",
				"-no-xcb",
				"-opensource",
				"-confirm-license",
				"--prefix=" + buildDir
			]); 
	};

	this.clean = function(spawn) {
		return spawn( 'make', [ 'clean' ] );
	};
}; 

module.exports = Mac;