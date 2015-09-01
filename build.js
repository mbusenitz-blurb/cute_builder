#!/usr/bin/env node

var program = require( 'commander' )
  , Agent = require( './agent' )
  , OS = require( isWindows() ? './win' : './mac' )
  , fs = require( 'fs' );

program
  .version('0.0.0')
  .option('-p, --path []', 'working directory')
  .option('-b, --build []', 'build directory ')
  .option('-d, --dry', 'dry run' )
  .parse(process.argv);

if (isWindows() && !fs.existsSync( 'C:\\OpenSSL-Win32\\lib')) {
  throw "ivalid OpenSSL-Win32 lib path specified";
}

buildQt( new Agent( new OS( program.build ), program ) );

function buildQt(agent) {
  agent.checkWorkingDir()
  .then( agent.checkEnv )
  .then( agent.clean )
  .catch( function(error) {
    console.log( 'clean failed: ', error );
    return agent.configure();
  })
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