var assert = require( 'assert' )
  , cp = require( 'child_process' )
  , fs = require( 'fs' )
  , Promise = require( 'promise' )

function Agent( config ) {

	var workingDir = config.workingDir;

	assert( typeof config.configure === 'function' ); 

	this.checkWorkingDir = function() {
		return new Promise( function( resolve, reject ) { 
			fs.exists( workingDir, function(exists) {
				if (exists) 
					resolve( '' );
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
		return new Promise( function( resolve, reject ) {
			config.configure( spawn, resolve, reject ); 
		} ); 
	};

	this.build = function() {
		return new Promise( function( reslove, reject ) {
			config.build( spawn, resolve, reject );
		} ); 
	};

	this.install = function() {
		return new Promise( function( reslove, reject ) {
			config.install( spawn, resolve, reject );
		} ); 
	};

	function spawn( name ) {
		return new Promise( function( reslove, reject ) {
			cp
			.spawn( cmd, args, { stdio: 'inherit', cwd: workingDir } )
			.on( 'exit', function(code) {
				if (code) 
					reject( name );
				else
					resolve();				
			});
		});
	};
}

module.exports = Agent;