const shell = require('shelljs');

shell.echo('Deleting old files.');
shell.rm('-rf', '../nest-server/public/*');

shell.echo('Copying new files.');
shell.cp('-R', './dist/*', '../nest-server/public/');

shell.echo('Done');
