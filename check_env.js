var cp = require( 'child_process' );

check( 'ruby -v' );
check( 'python --version' );
check( 'perl -v' );

function check( cmd ) {
	cp.exec( cmd, function(err, stdout, stderr) {
		if (err) {
			console.log( stderr ); 
			throw err;
		}
	});
}