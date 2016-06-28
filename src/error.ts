import log from 'npmlog';

const NAME = 'ws';
const IGNORED_TRACE_LINES = [
  // our bin
  'bin/ws.js:2:1)',
  // native
  'at [object Generator].next (native)',
  // polyfills
  'at fulfilled (',
  'core-js/modules/_microtask.js',
  'core-js/modules/es6.promise.js',
  // webpack
  '(./webpack/bootstrap',
  'at ./webpack/bootstrap',
  // node internals
  '(util.js',
  '(net.js',
  '(node.js',
  'at node.js',
  '(module.js',
  '(internal/module.js'
];

export class ActionError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
    this.message = message;

    const error = new Error();
    this.stack = error.stack;
  }
}

export function handleError(err: Error) {
  if (err instanceof ActionError) {
    log.error(err.name, err.message);
  } else if (err.stack) {
    err.stack.split('\n')
      .filter(line => !IGNORED_TRACE_LINES.some(ignoredLine => line.includes(ignoredLine)))
      .forEach(line => log.error(NAME, line));
  } else {
    log.error(NAME, err);
  }

  log.error(NAME, '(╯°□°）╯︵ ┻━┻');
  process.exit(1);
}

process.on('uncaughtException', handleError);