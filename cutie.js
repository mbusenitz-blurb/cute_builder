var Agent = require( './agent' )
  , OS = require( './dummy' )
  , agent = new Agent( OS );

//agent.after( 'check permissions done', 'check working dir' );
agent
.checkWorkingDir()
.then( agent.checkEnv )
.then( agent.configure ) 
.then( agent.build )
.then( agent.install )
.then( function() {
	console.log( 'done' ); 
}).catch( function( error ) {
	console.log( error );
}); 

