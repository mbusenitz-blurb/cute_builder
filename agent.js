var cp = require( 'child_process' )
  , fs = require( 'fs' )
  , workingDir = '/Users/jenkins/qt_source/qt5';

function register( controller ) {

	controller.on( 'check working dir', function() {
		console.log( 'check working dir: ', workingDir );
		fs.exists( workingDir, function(exists) {
			if (exists) {
				controller.emit( 'check working dir done' ); 
			}
			else {
				console.log( 'failed' ); 
			}
		});
	});

	controller.on( 'check env', function() {
		console.log( '* check env:');
		cp.fork( 'check_env' )
		.on( 'exit', function(code) { 
			controller.emit( 'check env done', code ); 
		});
	});

	controller.on( 'build', function() {
		spawnStep( 'build', 'make', [ '-j', '8' ] );
	});

	controller.on( 'install', function() {
		spawnStep( 'install', 'make', [ 'install' ] );
	});	

	controller.on( 'configure', function() {
		spawnStep( 
			'configure', 
			'./configure',
			[ 
				"-no-xcb",
				"-opensource",
				"-confirm-license",
				"--prefix=/Users/jenkins/qt_build_destination"
			]
		); 
	} ); 

	function spawnStep( name, cmd, args ) {
		console.log( '* ' + name + ':', cmd, args ); 
		cp
		.spawn( cmd, args, { stdio: 'inherit', cwd: workingDir } )
		.on( 'exit', function(code) {
			controller.emit( name + ' done', code ); 
		});
	}
}

module.exports.register = register;