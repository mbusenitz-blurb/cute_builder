/* 
NOTE: 

This script needs to be run from a "Visual studio command line prompt", 
see "C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\vcvarsall.bat"

*/ 

var cp = require( 'child_process' )
  , EventEmitter = new require( 'events' ).EventEmitter
  , controller = new EventEmitter(); 

var uid = parseInt( process.env.SUDO_UID );
if (!uid) {
	console.log( 'this must be run with sudo!' );
	process.exit( 1 );	
}  
if (uid) process.setuid( uid );

require( './Agent' ).register( controller ); 

controller.on( 'check working dir done', function() {
	controller.emit( 'check env' );
});

controller.on( 'check env done', function(code) {
	if (!code) {
		controller.emit( 'configure' ); 
	}
});

controller.on( 'configure done', function(code) {
	if (!code) {
		controller.emit( 'build' ); 
	}
});

controller.on( 'build done', function(code) {
	if (!code) {
		controller.emit( 'install' );
	}
});

controller.on( 'install done', function(code) {
	if (!code) {
		console.log( 'done' );
	}
});

//controller.emit( 'build' ); 
controller.emit( 'check working dir' ); 
