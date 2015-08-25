function Mac(buildDir) {
	this.build = function(spawn) {
		return spawn( 'make', [ '-j', '8' ] ).then( function() {
			spawn( 'make', [ 'install' ] );
		});
	}; 

	this.configure = function(spawn) {
		return spawn( 
			'./configure',
			[ 
				"-no-xcb",
				"-opensource",
				"-confirm-license",
				"--prefix=" + buildDir
			]); 
	}
}; 

module.exports = Mac;