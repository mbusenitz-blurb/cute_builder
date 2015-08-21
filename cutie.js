var cp = require( 'child_process' )
  , Agent = require( './agent' )
  , agent = new Agent( '' );

agent.after( 'check working dir done', 'check env' );
agent.after( 'check env done', 'configure' );
agent.after( 'configure done', 'build' );
agent.after( 'build done', console.log.bind( null, 'done' ) );
agent.emit( 'check working dir' ); 
