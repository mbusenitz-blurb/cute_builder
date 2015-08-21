var Agent = require( './agent' )
  , OS = require( './os' )
  , agent = new Agent( '/Users/mbusenitz/Qt5' )
  , os = new OS(agent);

agent.after( 'check permissions done', 'check working dir' );
agent.after( 'check working dir done', 'check env' );
agent.after( 'check env done', os.configure );
agent.after( 'configure done', os.build );
agent.after( 'build done', os.install );
agent.after( 'install done', console.log.bind( null, 'done' ) );
agent.emit( 'check permissions' ); 
