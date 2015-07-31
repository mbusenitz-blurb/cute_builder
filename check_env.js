var cp = require( 'child_process' );

checkRuby();
checkPython();
checkPerl();

function checkPerl() {
	cp.exec( 'perl -v', function(err, stdout, stderr) {
		if (err) throw err;
	});
}

function checkPython() {
	cp.exec( 'python --version', function(err, stdout, stderr) {
		if (err) throw err;
	});
}

function checkRuby() {
	cp.exec( 'ruby -v', function(err, stdout, stderr) {
		if (err) throw err;
	});
} 