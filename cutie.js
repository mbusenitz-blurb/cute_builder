var Agent = require( './agent' )
  , OS = require( './dummy' )
  , agent = new Agent( OS );

//agent.after( 'check permissions done', 'check working dir' );
agent
.checkWorkingDir()
.then( agent.checkEnv )
.then( agent.configure ) 
.catch( function( error ) {
	console.log( error );
}); 

// 
// .then( os.configre )
// .then( os.build )
// .then( os.install )
// .then( function() {
// 	console.log( 'done' ); 
// })
