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

after( 'check working dir done', 'check env' );
after( 'check env done', 'configure' );
after( 'configure done', 'build' );
after( 'build done', 'install' );
after( 'install done', console.log.bind( null, 'done' ) );

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
