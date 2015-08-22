module.exports = {

	build: function(spawn) {
		return spawn( 'build', 'nmake', [ 'install' ] );
	},

	configure: function(spawn) {
		return spawn( 
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
			]); 
	}
};