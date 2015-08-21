var cp = require( 'child_process' )
  , fs = require( 'fs' )
  , util = require( 'util' )
  , events = require( 'events' );

function Agent( workingDir ) {

	var instance = this;
	
	instance.on( 'check working dir', function() {
		console.log( '* check working dir: ', workingDir );
		fs.exists( workingDir, function(exists) {
			instance.emit( 'check working dir done', exists ? 0 : 1 ); 
		});
	});

	instance.on( 'check env', function() {
		console.log( '* check env:');
		cp.fork( 'check_env' )
		.on( 'exit', function(code) { 
			instance.emit( 'check env done', code ); 
		});
	});

	instance.spawn = function( name, cmd, args ) {
		console.log( '* ' + name + ':', cmd, args ); 
		cp
		.spawn( cmd, args, { stdio: 'inherit', cwd: workingDir } )
		.on( 'exit', function(code) {
			instance.emit( name + ' done', code ); 
		});
	};

	instance.after = function( pre, post ) {
		instance.on( pre, function(code) {
			if (!code) {
				if (typeof post === 'function') {
					post();
				}
				else {
					instance.emit( post ); 
				}
			}
			else {
				console.log( '"' + pre + '" result: failed' );
			}
		} );
	};
}

util.inherits( Agent, events.EventEmitter ); 

module.exports = Agent;