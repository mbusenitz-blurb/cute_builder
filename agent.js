var assert = require( 'assert' )
  , cp = require( 'child_process' )
  , fs = require( 'fs' )
  , path = require( 'path' )
  , util = require( 'util' )
  , Promise = require( 'promise' ); 

function Agent( config, workingDir ) {

	assert( typeof workingDir !== 'undefined', 'no working directory specified' );  

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
			.fork( path.join( __dirname, 'check_env' ) )
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

	this.clean = function() {
		return config.clean( spawn ); 
	};

	function spawn( cmd, args ) {
		return new Promise( function( resolve, reject ) {
			console.log( workingDir, '=>\n', cmd );
			console.log( util.inspect(args) );
			console.time( cmd );
			cp
			.spawn( cmd, args, { stdio: 'inherit', cwd: workingDir } )
			.on( 'exit', function(code, signal) {
				console.timeEnd( cmd );
				if (code) 
					reject( { code: code, signal: signal } );
				else
					resolve();				
			});
		});
	};
}

module.exports = Agent;
