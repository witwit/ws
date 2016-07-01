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

declare module 'loglevel' {
  /**
   * All log levels.
   */
  export const levels: {
    TRACE: number;
    DEBUG: number;
    INFO: number;
    WARN: number;
    ERROR: number;
    SILENT: number;
  };

  /**
   * Set your log level.
   * @param level Your new log level.
   */
  export function setLevel(level: number): void;

  /**
   * Logs a message at `trace` level.
   * @param msg The message which will be logged.
   */
  export function trace(msg: any): void;

  /**
   * Logs a message at `debug` level.
   * @param msg The message which will be logged.
   */
  export function debug(msg: any): void;

  /**
   * Logs a message at `info` level.
   * @param msg The message which will be logged.
   */
  export function info(msg: any): void;

  /**
   * Logs a message at `warn` level.
   * @param msg The message which will be logged.
   */
  export function warn(msg: any): void;

  /**
   * Logs a message at `error` level.
   * @param msg The message which will be logged.
   */
  export function error(msg: any): void;
}

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
