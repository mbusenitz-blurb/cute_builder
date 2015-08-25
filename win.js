
function Win(buildDir) {

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
};

module.exports = Win;