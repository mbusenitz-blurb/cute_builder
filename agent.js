var cp = require( 'child_process' )
  , fs = require( 'fs' )
  , workingDir = '';

function Agent( controller ) {

	controller.on( 'check working dir', function() {
		console.log( '* check working dir: ', workingDir );
		fs.exists( workingDir, function(exists) {
			controller.emit( 'check working dir done', exists ? 0 : 1 ); 
		});
	});

	controller.on( 'check env', function() {
		console.log( '* check env:');
		cp.fork( 'check_env' )
		.on( 'exit', function(code) { 
			controller.emit( 'check env done', code ); 
		});
	});
}

Agent.prototype.spawn = function( name, cmd, args ) {
	console.log( '* ' + name + ':', cmd, args ); 
	cp
	.spawn( cmd, args, { stdio: 'inherit', cwd: workingDir } )
	.on( 'exit', function(code) {
		controller.emit( name + ' done', code ); 
	});
};

module.exports.Agent = Agent;