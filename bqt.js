#!/usr/bin/env node

var program = require( 'commander' )
  , Agent = require( './agent' )
  , OS = require( isWindows() ? './win' : './mac' ); 

if (!isWindows()) {
  var uid = parseInt( process.env.SUDO_UID );
  if (!uid) {
    throw( 'cute builder must be run with sudo/admin privileges!' );    
  }  
  process.setuid( uid );
}

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

function isWindows() {
  return process.platform === 'win32' || process.platform === 'win64';
}