var OS = {

	workingDir: '/Users/mbusenitz/Qt5/5.5/Src',

	install: function() {
		console.log( 'OS install' );
		return agent.spawn( 'make', [ 'install' ] );
	},

	build: function() {
		return agent.spawn( 'make', [ '-j', '8' ] );
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
}

module.exports = OS; 