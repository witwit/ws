// declare var require: {
//   <T>(path: string): T;
//   (paths: string[], callback: (...modules: any[]) => void): void;
//   ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
// };

declare module 'properties' {
  export interface ParseOptions {
    path?: boolean;
    comments?: string | string[];
    separators?: string | string[];
    strict?: boolean;
    sections?: boolean;
    namespaces?: boolean;
    variables?: boolean;
    vars?: boolean;
    include?: boolean;
  }

  export function parse(data: string, options: ParseOptions, callback: (error: any, res: any) => void): void;
  export function parse(data: string, callback: (error: any, res: any) => void): void;
  export function parse(options: ParseOptions, callback: (error: any, res: any) => void): void;
  export function parse(data: string, options: ParseOptions): any;
  export function parse(options: ParseOptions): any;
}

declare module 'openport' {
  export interface FindOptions {
    count?: number;
    startingPort?: number;
    endingPort?: number;
    ports?: number[];
    avoid?: number[];
  }

  export function find(options: FindOptions, callback: (error: any, port: number) => void): void;
}

declare module 'html-webpack-plugin' {
  export default function HtmlWebpackPlugin(...params: any[]): void;
}

declare module 'omit-tilde-webpack-plugin' {
  export default function OmitTildeWebpackPlugin(param?: any): void;
}

declare module 'webpack-node-externals' {
  import webpack from 'webpack';
  export default function WebpackNodeExternals(...params: any[]): webpack.ExternalsFunctionElement;
}

declare module 'npmlog' {
  import * as stream from 'stream';

  /**
   * The level to display logs at. Any logs at or above this level
   * will be displayed. The special level 'silent' will prevent
   * anything from being displayed ever.
   */
  export var level: string;

  /**
   * An array of all the log messages that have been entered.
   */
  export var record: MessageObject[];

  /**
   * The maximum number of records to keep. If log.record gets bigger
   * than 10% over this value, then it is sliced down to 90% of this value.
   *
   * The reason for the 10% window is so that it doesn't have to resize
   * a large array on every log entry.
   */
  export var maxRecordSize: number;

  /**
   * A style object that specifies how prefixes are styled.
   */
  export var prefixStyle: StyleObject;

  /**
   * A style object that specifies how the heading is styled.
   */
  export var headingStyle: StyleObject;

  /**
   * If set, a heading that is printed at the start of every line.
   *
   * Default: ''
   */
  export var heading: string;

  /**
   * The stream where output is written.
   *
   * Default: process.stderr
   */
  export var stream: stream.Writable;

  /**
   * Force colors to be used on all messages, regardless of the output stream.
   */
  export function enableColor(): void;

  /**
   * Disable colors on all messages.
   */
  export function disableColor(): void;

  /**
   * Enable the display of log activity spinner and progress bar.
   */
  export function enableProgress(): void;

  /**
   * Disable the display of a progress bar.
   */
  export function disableProgress(): void;

  /**
   * Force the unicode theme to be used for the progress bar.
   */
  export function enableUnicode(): void;

  /**
   * Disable the use of unicode in the progress bar.
   */
  export function disableUnicode(): void;

  /**
   * Overrides the default gauge template.
   * @param template The new gauge template.
   */
  export function setGaugeTemplate(template: any): void;  // TODO: The gauge module should offer a better type.

  /**
   * Stop emitting messages to the stream, but do not drop them.
   */
  export function pause(): void;

  /**
   * Emit all buffered messages that were written while paused.
   */
  export function resume(): void;

  /**
   * Emit a log message at the specified level.
   * @param level The level to emit the message at.
   * @param prefix A string prefix. Set to '' to skip.
   * @param messages Arguments to util.format.
   */
  export function log(level: string, prefix: string, ...messages: any[]): void;

  /**
   * Emit a log message at the level 'silly'.
   * @param prefix A string prefix. Set to '' to skip.
   * @param messages Arguments to util.format.
   */
  export function silly(prefix: string, ...messages: any[]): void;

  /**
   * Emit a log message at the level 'verbose'.
   * @param prefix A string prefix. Set to '' to skip.
   * @param messages Arguments to util.format.
   */
  export function verbose(prefix: string, ...messages: any[]): void;

  /**
   * Emit a log message at the level 'info'.
   * @param prefix A string prefix. Set to '' to skip.
   * @param messages Arguments to util.format.
   */
  export function info(prefix: string, ...messages: any[]): void;

  /**
   * Emit a log message at the level 'http'.
   * @param prefix A string prefix. Set to '' to skip.
   * @param messages Arguments to util.format.
   */
  export function http(prefix: string, ...messages: any[]): void;

  /**
   * Emit a log message at the level 'warn'.
   * @param prefix A string prefix. Set to '' to skip.
   * @param messages Arguments to util.format.
   */
  export function warn(prefix: string, ...messages: any[]): void;

  /**
   * Emit a log message at the level 'error'.
   * @param prefix A string prefix. Set to '' to skip.
   * @param messages Arguments to util.format.
   */
  export function error(prefix: string, ...messages: any[]): void;

  /**
   * Sets up a new level with a shorthand function and so forth.
   *
   * Note that if the number is 'Infinity', then setting the level to
   * that will cause all log messages to be suppressed. If the number
   * is '-Infinity', then the only way to show it is to enable all log
   * messages.
   * @param level The level indicator.
   * @param n The numeric level.
   * @param style Object with fg, bg, inverse, etc.
   * @param disp Optional replacement for 'level' in the output.
   */
  export function addLevel(level: string, n: number, style: StyleObject, disp?: string): void;

  /**
   * This adds a new 'are-we-there-yet' item tracker to the progress tracker.
   * The object returned has the 'log[level]' methods but is otherwise an
   * 'are-we-there-yet' 'Tracker' object.
   * @param name Progress item name.
   * @param todo Total amount of work to be done. Default: 0
   * @param weight The weight of this item relative to others. Default 1
   */
  export function newItem(name?: string, todo?: number, weight?: number): void;

  /**
   * This adds a new 'are-we-there-yet' item tracker to the progress tracker.
   * The object returned has the 'log[level]' methods but is otherwise an
   * 'are-we-there-yet' 'TrackerStream' object.
   * @param name Progress item name.
   * @param todo Total amount of work to be done. Default: 0
   * @param weight The weight of this item relative to others. Default 1
   */
  export function newStream(name?: string, todo?: number, weight?: number): void;

  /**
   * This adds a new 'are-we-there-yet' item tracker to the progress tracker.
   * The object returned has the 'log[level]' methods but is otherwise an
   * 'are-we-there-yet' 'TrackerGroup' object.
   * @param name Progress item name.
   * @param weight The weight of this item relative to others. Default 1
   */
  export function newGroup(name?: string, weight?: number): void;

  /**
   * Style objects can have the following fields:
   */
  export interface StyleObject {
    /**
     * Color for the foreground text.
     */
    fg?: string;
    /**
     * Color for the background.
     */
    bg?: string;
    /**
     * Set the bold property.
     */
    bold?: boolean;
    /**
     * Set the inverse property.
     */
    inverse?: boolean;
    /**
     * Set the underline property.
     */
    underline?: boolean;
    /**
     * Make a noise (This is pretty annoying, probably.)
     */
    bell?: boolean;
  }

  /**
   * Every log event is emitted with a message object, and the 'log.record'
   * list contains all of them that have been created. They have the
   * following fields:
   */
  export interface MessageObject {
    id: number;
    level: string;
    prefix: string;
    /**
     * Result of 'util.format()'.
     */
    message: string;
    /**
     * Arguments to 'util.format()'.
     */
    messageRaw: any[];
  }
}

// declare module 'moment' {
//   export default function moment(...params: any[]): any;
// }

declare module 'babel-core' {
  export function transformFile(filename: string, options: any, callback: (error: any, result: any) => void): void;
}

declare module 'livereload' {
  export function createServer(): void;
}

declare module 'connect-livereload' {
  export default function livereloadMiddleware(): void;
}

declare module 'extract-text-webpack-plugin' {
  function ExtractTextWebpackPlugin(...params: any[]): void;

  namespace ExtractTextWebpackPlugin {
    function extract(...params: any[]): any;
  }

  export default ExtractTextWebpackPlugin;
}

declare module 'selenium-grid-status' {
  export interface SeleniumGridConfig {
    host: string;
    port: number;
  }

  export interface SeleniumBrowser {
    seleniumProtocol: string;
    browserName: string;
    maxInstances: string;
    version: string;
    platform: string;
  }

  export interface SeleniumNode {
    browser: SeleniumBrowser[];
  }

  export function available(config: SeleniumGridConfig, callback: (error: any, result: SeleniumNode[]) => void): void;
}
