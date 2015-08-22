var assert = require( 'assert' )
  , cp = require( 'child_process' )
  , fs = require( 'fs' )
  , util = require( 'util' )
  , Promise = require( 'promise' ); 

function Agent( config, workingDir ) {

	assert( typeof workingDir !== 'undefined' ); 

	this.checkWorkingDir = function() {
		return new Promise( function( resolve, reject ) { 
			fs.exists( workingDir, function(exists) {
				if (exists) 
					resolve();
				else {
					reject( 'working dir ' + workingDir + " doesn't exist" );
				}
			});	
		} ); 
	};

	this.checkEnv = function() {
		return new Promise( function( resolve, reject ) {
			cp
			.fork( 'check_env' )
			.on( 'exit', function(code) { 
				if (code) 
					reject( 'check environment failed' );
				else
					resolve();
			});
		} ); 
	};

	this.configure = function() {
		return config.configure( spawn ); 
	};	

	this.build = function() {
		return config.build( spawn ); 
	};

	function spawn( cmd, args ) {
		return new Promise( function( resolve, reject ) {
			console.log( workingDir, '=>\n', cmd );
			console.log( util.inspect(args) );
			console.time( cmd );
			cp
			.spawn( cmd, args, { stdio: 'inherit', cwd: workingDir } )
			.on( 'exit', function(code, signal) {
				console.timeEnd();
				if (code) 
					reject( cmd + code + signal );
				else
					resolve();				
			});
		});
	};
}

module.exports = Agent;
