module.exports = {

	install: function(spawn) {
		return spawn( 'make', [ 'install' ] );
	},

	build: function(spawn) {
		return spawn( 'make', [ '-j', '8' ] );
	}, 

	configure: function(spawn) {
		return spawn( 
			'./configure',
			[ 
				"-no-xcb",
				"-opensource",
				"-confirm-license",
				"--prefix=/Users/jenkins/qt_build_destination"
			]); 
	}
}; 