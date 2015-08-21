function OS(agent) {

	this.install = function() {
		agent.spawn( 'install', 'make', [ 'install' ] );
	};

	this.build = function() {
		agent.spawn( 'build', 'make', [ '-j', '8' ] );
	}; 

	this.configure = function() {
		agent.spawn( 
			'configure', 
			'./configure',
			[ 
				"-no-xcb",
				"-opensource",
				"-confirm-license",
				"--prefix=/Users/jenkins/qt_build_destination"
			]
		); 
	};
}

module.exports = OS; 