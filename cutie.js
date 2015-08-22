var program = require( 'commander' )
  , Agent = require( './agent' )
  , OS = require( './mac' )
  , agent; 

program
  .version('0.0.0')
  .option('-p, --path []', 'working directory')
  .parse(process.argv);

agent = new Agent( OS, program.path );

agent.checkWorkingDir()
.then( agent.checkEnv )
.then( agent.configure )
.then( agent.build )
.then( console.log.bind( null, 'done' ) )
.catch( function(error) {
  console.log( error );
});
