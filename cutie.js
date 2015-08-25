#!/usr/bin/env node

var program = require( 'commander' )
  , Agent = require( './agent' )
  , OS = require( process.platform === 'win32' ? './win' : './mac' ); 

program
  .version('0.0.0')
  .option('-p, --path []', 'working directory')
  .option('-b, --build []', 'build directory ')
  .parse(process.argv);

buildQt( new Agent( new OS( program.build ), program.path ) );

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