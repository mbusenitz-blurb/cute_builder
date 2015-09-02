var fs = require( 'fs' );

function Win(buildDir) {

	this.checkEnv = function(spawn) {
		return new Promise( function( reslove, reject ) {
			fs.exists( 'C:\\OpenSSL-Win32\\lib', function(exists) {
				if (exists)
					reslove(); 
				else
					reject( "Invalid OpenSSL-Win32 lib path specified" );
			} ); 
		});
	};

	this.build = function(spawn) {
		return spawn( 'nmake', [ 'install' ] );
	};

	this.configure = function(spawn) {
		return spawn( 
			'cmd.exe',			
			[ 
				'/s', 
				'/c', 
				'configure.bat',
				'-debug-and-release',
				'-prefix', buildDir,
				'-commercial',
				'-nomake', 'tests', 
				'-nomake', 'examples', 
				'-confirm-license',
				'-target', 'xp',
				'-opengl', 'desktop', 
				'-openssl', '-I', 'C:\\OpenSSL-Win32\\include', '-L', 'C:\\OpenSSL-Win32\\lib'
			]); 
	};

	this.clean = function(spawn) {
		return spawn( 'nmake', [ 'clean' ] );
	};
};

module.exports = Win;