var assert = require( 'assert' )
  , cp = require( 'child_process' )
  , fs = require( 'fs' )
  , Promise = require( 'promise' )
  , program = require( 'commander' );

program
  .version('0.0.0')
  .option('-p, --path []', 'working directory')
  .parse(process.argv);

assert( program.path ); 

function Agent( config ) {

	var workingDir = program.path;

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
		return config.configure( spawn ); 
	};	

	this.build = function() {
		return config.build( spawn ); 
	};

	function spawn( cmd, args ) {
		return new Promise( function( resolve, reject ) {
			cp
			.spawn( cmd, args, { stdio: 'inherit', cwd: workingDir } )
			.on( 'exit', function(code, signal) {
				if (code) 
					reject( cmd + code + signal );
				else
					resolve();				
			});
		});
	};
}

module.exports = Agent;
