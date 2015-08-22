module.exports = {

	build: function(spawn) {
		return spawn( 'make', [ '-j', '8' ] ).then( function() {
			spawn( 'make', [ 'install' ] );
		});
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