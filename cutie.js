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

after( 'check working dir done', 'check env' );
after( 'check env done', 'configure' );
after( 'configure done', 'build' );
after( 'build done', console.log.bind( null, 'done' ) );

controller.emit( 'check working dir' ); 

function after( pre, post )
{
	controller.on( pre, function(code) {
		if (!code) {
			if (typeof post === 'function') {
				post();
			}
			else {
				controller.emit( post ); 
			}
		}
		else {
			console.log( '"' + pre + '" result: failed' );
		}
	} );
}
