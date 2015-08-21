#!/usr/bin/env node

/* 
NOTE: 

This script needs to be run from a "Visual studio command line prompt", 
see "C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\vcvarsall.bat"

*/ 

var cp = require( 'child_process' )
  , EventEmitter = new require( 'events' ).EventEmitter
  , controller = new EventEmitter(); 

require( './Agent' ).register( controller );


when( 'check working dir done', 'check env' );
when( 'check env done', 'configure' );
when( 'configure done', 'build' );
when( 'build done', function(code) {
	if (!code) {
		console.log( 'done' ); 
	}
});

controller.emit( 'check working dir' ); 

function when( pre, post )
{
	controller.on( pre, function(code) {
		if (!code) {
			if (typeof post === 'function') {
				post(code);
			}
			else {
				controller.emit( post ); 
			}
		}
	} );
}
