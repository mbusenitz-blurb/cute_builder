var cp = require( 'child_process' )
  , fs = require( 'fs' )
  , workingDir = 'C:\\Qt\\Qt5.4.1\\5.4\\Src\\';

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
		spawnStep( 'build', 'nmake', [ 'install' ] );
	});

	controller.on( 'configure', function() {
		spawnStep( 
			'configure', 
			'cmd.exe', 
			[ 
				'/s', 
				'/c', 
				'configure.bat',
				'-debug-and-release',
				'-prefix', 'C:\\Qt\\5.4.1_test_build\\msvc2013',
				'-commercial',
				'-nomake', 'tests', 
				'-nomake', 'examples', 
				'-confirm-license',
				'-target', 'xp',
				'-opengl', 'desktop', 
				'-openssl', '-I', 'C:\\OpenSSL-Win32\\include', '-L', 'C:\\OpenSSL-Win32\\lib'
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