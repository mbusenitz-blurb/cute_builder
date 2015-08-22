var program = require( 'commander' )
  , Agent = require( './agent' )
  , OS = require( process.platform === 'win32' ? './win' : './mac' ); 

program
  .version('0.0.0')
  .option('-p, --path []', 'working directory')
  .parse(process.argv);

buildQt( new Agent( OS, program.path ) );

function buildQt(agent) {
  agent.checkWorkingDir()
  .then( agent.checkEnv )
  .then( agent.configure )
  .then( agent.build )
  .then( console.log.bind( null, 'done' ) )
  .catch( function(error) {
    console.log( error );
  });
}