const shell = require('shelljs');

shell.echo('Deleting old files.');
shell.rm('-rf', '../server/public/*');

shell.echo('Copying new files.');
shell.cp('-R', './dist/*', '../server/public/');

shell.echo('Done');
