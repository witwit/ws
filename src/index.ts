import { handleError } from './error';
import commander from 'commander';
import log from 'npmlog';
import { yellow } from 'chalk';
import { project, TYPE } from './project';
import serveAction from './actions/serve';
import buildAction from './actions/build';
import watchAction from './actions/watch';
import lintAction from './actions/lint';
import unitAction from './actions/unit';
import i18nImportAction from './actions/i18n-import';
import i18nCompileAction from './actions/i18n-compile';

// common setup
const NAME = 'ws';
const pkg = require('../package.json');
commander.version(pkg.version);
commander.usage('<command> [options]');

// global options
const allowedLogLevels = [ 'silly', 'verbose', 'info', 'warn', 'error', 'silent' ];
commander.option('-l, --log-level <level>', 'set log level', value => {
  if (allowedLogLevels.some(allowedValue => value === allowedValue)) {
    return value;
  } else {
    throw `Log level must be one of the following values: ${allowedLogLevels.join(', ')}.`;
  }
}, 'info');

function handleGlobalOptions(options) {
  log.level = options.parent.logLevel;
}

// specific setup
switch (project.ws.type) {
  case TYPE.SPA:
    commander.description('We build your SPA!');

    commander
      .command('serve')
      .alias('s')
      .description('serve the project')
      .option('-p, --production', 'serve production build')
      .action(options => {
        handleGlobalOptions(options);
        serveAction(options).catch(handleError);
      });
    break;
  case TYPE.NODE:
    commander.description('We build your Node module!');
    break;
  case TYPE.BROWSER:
    commander.description('We build your Browser module!');
    break;
}

if (project.ws.i18n) {
  commander
    .command('i18n:compile')
    .alias('i18n:c')
    .description('compile translations')
    // .option('--feature <feature>', 'feature to import')
    // .option('-l, --locale <locale>', 'locale to import')
    .action(options => {
      handleGlobalOptions(options);
      i18nCompileAction().catch(handleError);
    });

  if (project.ws.i18n.importUrl) {
    commander
      .command('i18n:import')
      .alias('i18n:i')
      .description('import translations')
      // .option('--feature <feature>', 'feature to import')
      // .option('-l, --locale <locale>', 'locale to import')
      .action(options => {
        handleGlobalOptions(options);
        i18nImportAction().catch(handleError);
    });
  }
}

// shared setup
switch (project.ws.type) {
  case TYPE.SPA:
  case TYPE.NODE:
  case TYPE.BROWSER:
    const buildCommand = commander
      .command('build')
      .alias('b')
      .description('build the project')
      .action(options => {
        handleGlobalOptions(options);
        buildAction(options).catch(handleError);
      });

    if (project.ws.type === TYPE.SPA) {
      buildCommand.option('-p, --production', 'create production build');
    }

    commander
      .command('watch')
      .alias('w')
      .description('continuously build and serve the project')
      // .option('-H, --hot', 'enables hot reloading (experimental)')
      .action(options => {
        handleGlobalOptions(options);
        watchAction().catch(handleError);
      });

    commander
      .command('lint')
      .alias('l')
      .description('run linter')
      .action(options => {
        handleGlobalOptions(options);
        lintAction().catch(handleError);
      });

    const unitCommand = commander
      .command('unit')
      .alias('u')
      .description('run unit tests')
      // .option('-c, --coverage', 'generates code coverage')
      .action(options => {
        handleGlobalOptions(options);
        unitAction(options).catch(handleError);
      });

    if (project.ws.selenium) {
      unitCommand.option('-g, --grid', 'run on selenium grid');
    }
    break;
}

// handle unknown commands
commander.on('*', name => {
  commander.outputHelp();
  log.error(NAME, `${yellow(name)} is not a known command.`);
});

// invoke commands
commander.parse(process.argv);

// hande default command
if (!commander.args.length) {
  commander.help();
}
