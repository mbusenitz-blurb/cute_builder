var Agent = require( './agent' )
  , OS = require( './mac_base' )
  , agent = new Agent( OS );

agent
.checkWorkingDir()
.then( agent.checkEnv )
.then( agent.configure ) 
.then( agent.build )
.then( function() {
	console.log( 'done' ); 
}).catch( function( error ) {
	console.log( error );
}); 

