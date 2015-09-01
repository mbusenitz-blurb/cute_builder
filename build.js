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
  throw "Invalid OpenSSL-Win32 lib path specified";
}

buildQt( new Agent( new OS( program.build ), program ) );

function buildQt(agent) {
  agent
  .checkWorkingDir()
  .then( agent.checkEnv )
  .catch( fail )
  .then( agent.clean )
  .catch( print )
  .then( agent.configure )
  .then( agent.build )
  .catch( print );

  function fail(err) {
    print( err ); 
    process.exit(0); 
  }

  function print(msg) {
    console.log( msg ); 
  }
}

function isWindows() {
  return process.platform === 'win32' || process.platform === 'win64';
}