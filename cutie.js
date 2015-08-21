var Agent = require( './agent' )
  , agent = new Agent( '' );

agent.after( 'check permissions done', 'check working dir' );
agent.after( 'check working dir done', 'check env' );
agent.after( 'check env done', 'configure' );
agent.after( 'configure done', 'build' );
agent.after( 'build done', 'install' );
agent.after( 'install done', console.log.bind( null, 'done' ) );
agent.emit( 'check permissions' ); 
