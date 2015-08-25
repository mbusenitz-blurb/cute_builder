var cp = require( 'child_process' );

if (process.platform !== 'win32') {
	var uid = parseInt( process.env.SUDO_UID );
	if (!uid) {
		throw( 'cute builder must be run with sudo/admin privileges!' );    
	}  
	process.setuid( uid );
}

check( 'ruby -v' );
check( 'python --version' );
check( 'perl -v' );

function check( cmd ) {
	cp.exec( cmd, function(err, stdout, stderr) {
		if (err) throw err;
	});
}