import { join } from 'path';
import webpack, { DefinePlugin, optimize, Entry } from 'webpack';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import WebpackNodeExternals from 'webpack-node-externals';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import { resolve as resolveFile } from '../resolve';
import { project } from '../../project';
import { dllCache } from './dll';

/**
 * We make some properties of `webpack.Configuration` mandatory. It is easier for future usage, so we don't
 * need to check, if they are available or not.
 */
export interface WebpackSingleConfig extends webpack.Configuration {
  entry: string | Array<string> | webpack.Entry;
  output: webpack.Output & {
    filename: string;
    path: string;
  };
  // new option (see https://medium.com/webpack/webpack-performance-budgets-13d4880fbf6d)
  performance?: {
    maxAssetSize?: number;
    maxEntrypointSize?: number;
    hints?: false | 'warning' | 'error';
  };
}

export type WebpackConfig = WebpackSingleConfig | Array<WebpackSingleConfig>;

const getDefaultLocales = (): Array<string> => project.ws.i18n ? project.ws.i18n.locales : [];

const nodeSourceMapEntry = 'source-map-support/register';

const output = {
  filename: 'index.js',
  // removes tabs (better for multiline strings)
  sourcePrefix: ''
};

const outputDev = { ...output,
  path: join(process.cwd(), project.ws.distDir)
};

export const outputRelease = { ...output,
  path: join(process.cwd(), project.ws.distReleaseDir)
};

const outputTest = { ...output,
  path: join(process.cwd(), project.ws.distTestsDir)
};

const babelNode = {
  presets: [
    [resolveFile('babel-preset-env'), {
      targets: { node: project.ws.targets.node },
      useBuiltIns: true
    }],
    resolveFile('babel-preset-stage-0')
  ],
  plugins: [
    resolveFile('babel-plugin-transform-decorators-legacy')
  ]
};

const babelBrowser = {
  presets: [
    [resolveFile('babel-preset-env'), {
      targets: { browsers: project.ws.targets.browsers },
      modules: false,
      useBuiltIns: true
    }],
    resolveFile('babel-preset-react'),
    resolveFile('babel-preset-stage-0')
  ],
  plugins: [
    resolveFile('babel-plugin-transform-decorators-legacy')
  ],
  // this removes the "[BABEL] Note: The code generator has deoptimised the styling of..." warning
  // I don't think we need `compact`, because our code is minified for production separately
  compact: false
};

export const jsLoaderNode = {
  test: /\.js(x?)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: { ...babelNode, cacheDirectory: true }
};

export const jsLoaderBrowser = {
  test: /\.js(x?)$/,
  exclude: new RegExp(`(node_modules|${project.ws.i18n ? project.ws.i18n.locales.map(locale => `${project.ws.i18n!.distDir}\/${locale}`).join('|') : ''})`),
  loader: 'babel-loader',
  options: { ...babelBrowser, cacheDirectory: true }
};

export const tsLoaderNode = {
  test: /\.ts(x?)$/,
  use: [
    {
      loader: 'babel-loader',
      options: { ...babelNode, cacheDirectory: true }
    },
    {
      loader: 'ts-loader',
      options: {
        silent: true
      }
    }
  ]
};

export const tsLoaderBrowser = {
  test: /\.ts(x?)$/,
  use: [
    {
      loader: 'string-replace-loader',
      options: {
        search: '_import(',
        replace: 'import('

      }
    },
    {
      loader: 'babel-loader',
      options: { ...babelBrowser, cacheDirectory: true }
    },
    {
      loader: 'ts-loader',
      options: {
        silent: true
      }
    }
  ]
};

export const awesomeTsLoaderBrowser = {
  test: /\.ts(x?)$/,
  use: [
    {
      loader: 'string-replace-loader',
      options: {
        search: '_import(',
        replace: 'import('

      }
    },
    {
      loader: 'babel-loader',
      options: { ...babelBrowser, cacheDirectory: true }
    },
    {
      loader: 'awesome-typescript-loader',
      options: {
        silent: true
      }
    }
  ]
};

export const jsonLoader = {
  test: /\.json$/,
  loader: 'json-loader'
};

export const cssLoader = {
  test: /\.css$/,
  loader: ExtractTextWebpackPlugin.extract({
    fallbackLoader: `style-loader?context=${process.cwd()}`,
    loader: `css-loader?sourceMap&context=${process.cwd()}!postcss-loader?sourceMap`
  })
};

export const lessLoader = {
  test: /\.less/,
  loader: ExtractTextWebpackPlugin.extract({
    fallbackLoader: `style-loader?context=${process.cwd()}`,
    loader: `css-loader?sourceMap&context=${process.cwd()}!postcss-loader?sourceMap!less-loader?sourceMap`
  })
};

export const imageLoader = {
  test: /\.(png|jpg|gif|svg)$/,
  loader: 'url-loader?limit=1000&name=[name]-[hash].[ext]'
};

export const eotLoader = {
  test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file-loader'
};

export const woffLoader = {
  test: /\.(woff|woff2)$/,
  loader: 'url-loader?prefix=font/&limit=5000'
};

export const ttfLoader = {
  test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
};

export const productionOptionsPlugin = new (webpack as any).LoaderOptionsPlugin({
  minimize: true,
  debug: false
});

export const extractCssPlugin = new ExtractTextWebpackPlugin('style.css');

// export const extractCssMinPlugin = new ExtractTextWebpackPlugin('style.min.css');

export const extractCssHashPlugin = new ExtractTextWebpackPlugin('style-[contenthash].css');

export const loaderOptionsPlugin = new (webpack as any).LoaderOptionsPlugin({
  options: {
    resolve: {},
    postcss: () => [
      autoprefixer({
        browsers: project.ws.targets.browsers
      })
    ]
  }
});

export const defineProductionPlugin = new DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
});

export const minifyJsPlugin = new optimize.UglifyJsPlugin();

export const indexHtmlPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './src/index.html'
});

export const dllPlugin = new (webpack as any).DllReferencePlugin({
  context: process.cwd(),
  manifest: join(dllCache, 'vendor.json')
});

export const unlocalizedAddAssetPlugin = new (AddAssetHtmlPlugin as any)([
  { filepath: join('dist', 'vendor.dll.js'), includeSourcemap: false },
  { filepath: join('dist', 'vendor.dll.css'), typeOfAsset: 'css', includeSourcemap: false }
]);

// export const indexHtmlI18nPlugin = new HtmlWebpackPlugin({
//   filename: 'index.html',
//   template: './src/index.i18n.html'
// });

export const resolveLoader = {
  // if you symlink the ws tool (e.g. while development), you want to resolve loaders
  // relative to the ws tool first (just like a normale `require()` would work)
  modules: [
    // relative to `dist/index.js`
    join(__dirname, '..', 'node_modules'),
    join(process.cwd(), 'node_modules'),
    'node_modules'
  ],
  alias: {
    // see https://www.npmjs.com/package/copy-loader
    ['copy-loader']: `file-loader?name=[path][name].[ext]&context=./${project.ws.srcDir}`
  }
};

// defaults
// see https://github.com/webpack/webpack/blob/dc50c0360e87204ea77172910e877f8c510f3bfb/lib/WebpackOptionsDefaulter.js#L75
const defaultExtensions = [
  '.js'
];

const tsExtensions = [
  '.ts',
  '.tsx'
].concat(defaultExtensions);

const mainFieldsNode = [
  'webpack',
  // defaults
  // see https://github.com/webpack/webpack/blob/dc50c0360e87204ea77172910e877f8c510f3bfb/lib/WebpackOptionsDefaulter.js#L86
  'module',
  'main'
];

const mainFieldsBrowser = [
  'webpack',
  // defaults
  // see https://github.com/webpack/webpack/blob/dc50c0360e87204ea77172910e877f8c510f3bfb/lib/WebpackOptionsDefaulter.js#L84
  'browser',
  'module',
  'main'
];

export const resolve = {
  extensions: project.ws.entryExtension === 'js' ? defaultExtensions : tsExtensions,
  mainFields: project.ws.type === 'node' ? mainFieldsNode : mainFieldsBrowser
};

export const devtool = 'inline-source-map';

export const devtoolProduction = 'source-map';

// export const devtoolTest = 'inline-source-map';

export const externalsNode = [
  // require json files with nodes built-in require logic
  function (_context: any, request: any, callback: any) {
    if (/\.json$/.test(request)) {
      callback(null, 'commonjs ' + request);
    } else {
      callback();
    }
  },
  // in order to ignore all modules in node_modules folder
  WebpackNodeExternals()
];

export const externalsBrowser = [
  (_context: any, request: any, callback: any) => {
    // if it starts with a letter (and *not* a path like './', '../' or '/') we treat this module as external
    // except 'mercateo/i18n'
    if (/^[a-zA-Z]/.test(request) && !request.includes('mercateo/i18n')) {
      callback(null, request);
    } else {
      callback();
    }
  }
].concat(project.ws.externals ? [
  project.ws.externals
] : []);

const enzymeExternals = ['react/lib/ExecutionEnvironment', 'react/lib/ReactContext', 'react/addons'];

const moduleNode = {
  loaders: [
    jsLoaderNode,
    tsLoaderNode
  ]
};

const sharedBrowserLoaders = [
  jsLoaderBrowser,
  jsonLoader,
  cssLoader,
  lessLoader,
  imageLoader,
  eotLoader,
  woffLoader,
  ttfLoader
];

// awesome loader is super fast but does not genrate declaration files ATM
// see https://github.com/s-panferov/awesome-typescript-loader/issues/321
const moduleBrowser = {
  loaders: [
    ...sharedBrowserLoaders,
    awesomeTsLoaderBrowser
  ]
};

// ts-loader is super slow but with declaration files :)
const browserReleaseModule = {
  loaders: [
    ...sharedBrowserLoaders,
    tsLoaderBrowser
  ]
};


const localizedEntry: any = {};
const localizedIndexHtmlPlugins: Array<any> = [];
if (project.ws.i18n) {
  localizedEntry.index = project.ws.srcEntry;
  project.ws.i18n.locales.forEach(locale => {
    const chunkKey = `${locale}/i18n`;
    localizedEntry[chunkKey] = `./${project.ws.i18n!.distDir}/${locale}.js`;
    localizedIndexHtmlPlugins.push(new HtmlWebpackPlugin({
      locale,
      locales: project.ws.i18n!.locales,
      filename: `${locale}/index.html`,
      template: 'src/index.html',
      chunks: [chunkKey, 'index'],
      chunksSortMode: (a: any) => a.names[0] === 'index' ? 1 : 0
    }));
  });
}

const spaEntry = project.ws.i18n ? localizedEntry : project.ws.srcEntry;
const spaIndexHtmlPlugins = project.ws.i18n ? localizedIndexHtmlPlugins : [indexHtmlPlugin];

const getUnlocalizedSpaDevOptions = (): WebpackSingleConfig => ({
  entry: project.ws.srcEntry,
  output: {
    ...outputDev,
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  module: moduleBrowser,
  plugins: [
    indexHtmlPlugin,
    extractCssPlugin,
    loaderOptionsPlugin
    // unlocalizedAddAssetPlugin
    // dllPlugin
  ],
  externals: [],
  performance: {
    hints: false
  },
  resolveLoader,
  resolve,
  devtool
});

const getLocalizedSpaDevOptions = (locales: Array<string>): WebpackSingleConfig => {
  const options = getUnlocalizedSpaDevOptions();

  const entry: Entry = {
    index: project.ws.srcEntry
  };
  const indexHtmlPlugins: Array<HtmlWebpackPlugin> = [];
  locales.forEach(locale => {
    const chunkKey = `${locale}/i18n`;
    entry[chunkKey] = `./${project.ws.i18n!.distDir}/${locale}.js`;
    indexHtmlPlugins.push(new HtmlWebpackPlugin({
      locale,
      locales: project.ws.i18n!.locales,
      filename: `${locale}/index.html`,
      template: 'src/index.html',
      chunks: [chunkKey, 'index'],
      chunksSortMode: (a: any) => a.names[0] === 'index' ? 1 : 0
    }));
  });

  options.entry = entry;
  options.plugins = indexHtmlPlugins
    // .concat(locales.map(locale => new (AddAssetHtmlPlugin as any)([{ filepath: join('dist', locale, 'vendor.dll.js'), includeSourcemap: false }, { filepath: join('dist', locale, 'vendor.dll.css'), typeOfAsset: 'css', includeSourcemap: false }])))
    .concat([
      // dllPlugin,
      extractCssPlugin,
      loaderOptionsPlugin
    ]) as any;
  options.externals = [project.ws.i18n!.module];

  return options;
};

export const getSpaDevOptions = (locales: Array<string> = getDefaultLocales()): WebpackSingleConfig =>
  locales.length ? getLocalizedSpaDevOptions(locales) : getUnlocalizedSpaDevOptions();


export const getSpaDevDllOptions = (): WebpackSingleConfig => ({
  context: process.cwd(),
  entry: {
    vendor: Object.keys(project.dependencies || {}).filter(x => !x.startsWith('@types'))
  },
  output: {
    filename: '[name].dll.js',
    path: dllCache,
    library: '[name]'
  },
  module: moduleBrowser,
  plugins: [
    new (webpack as any).DllPlugin({
      path: join(dllCache, '[name].json'),
      name: '[name]'
    }),
    new ExtractTextWebpackPlugin('vendor.dll.css'),
    loaderOptionsPlugin
  ],
  performance: {
    hints: false
  },
  externals: project.ws.i18n ? [{ [project.ws.i18n!.module]: `this ${project.ws.i18n!.module}` }] : [],
  resolveLoader,
  resolve,
  devtool
});

export const spaReleaseOptions: WebpackSingleConfig = {
  entry: spaEntry,
  output: {
    ...outputRelease,
    libraryTarget: 'umd',
    filename: '[name]-[hash].js'
  },
  module: moduleBrowser,
  plugins: spaIndexHtmlPlugins.concat([
    extractCssHashPlugin,
    loaderOptionsPlugin,
    defineProductionPlugin,
    minifyJsPlugin,
    productionOptionsPlugin
  ]),
  externals: project.ws.i18n ? [project.ws.i18n.module] : [],
  resolveLoader,
  resolve,
  devtool: devtoolProduction
};

export const spaUnitOptions: WebpackSingleConfig = {
  entry: project.ws.unitEntry,
  output: outputTest,
  module: moduleBrowser,
  plugins: [
    extractCssPlugin,
    loaderOptionsPlugin
  ],
  externals: enzymeExternals,
  performance: {
    hints: false
  },
  resolveLoader,
  resolve: {
    ...resolve,
    ...(project.ws.i18n ? {
      alias: {
        [project.ws.i18n.module]: `${process.cwd()}/${project.ws.i18n.distDir}/unit.js`
      }
    } : {})
  },
  devtool
};

export const spaE2eOptions: WebpackSingleConfig = {
  entry: [
    nodeSourceMapEntry,
    project.ws.e2eEntry
  ],
  output: {
    ...outputTest,
    libraryTarget: 'commonjs2'
  },
  module: moduleNode,
  externals: externalsNode,
  performance: {
    hints: false
  },
  // in order to ignore built-in modules like path, fs, etc.
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  resolveLoader,
  resolve,
  devtool
};

// e.g.to create a locale switcher or redirect for localized spa’s
export const spaRootI18nDevOptions: WebpackSingleConfig = project.ws.i18n ? {
  entry: {
    indexI18n: project.ws.srcI18nEntry,
    i18n: `./${project.ws.i18n.distDir}/${project.ws.i18n.locales[0]}.js`
  },
  output: {
    ...outputDev,
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  module: moduleBrowser,
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.i18n.html',
      locale: project.ws.i18n.locales[0],
      locales: project.ws.i18n.locales,
      chunks: ['i18n', 'indexI18n'],
      chunksSortMode: (a: any) => a.names[0] === 'index' ? 1 : 0
    }),
    extractCssPlugin,
    loaderOptionsPlugin
    // defineLocalesPlugin
  ],
  externals: [project.ws.i18n.module],
  performance: {
    hints: false
  },
  resolveLoader,
  resolve,
  devtool
} : ({} as any);

export const spaRootI18nReleaseOptions: WebpackSingleConfig = project.ws.i18n ? {
  entry: {
    indexI18n: project.ws.srcI18nEntry,
    i18n: `./${project.ws.i18n.distDir}/${project.ws.i18n.locales[0]}.js`
  },
  output: {
    ...outputRelease,
    libraryTarget: 'umd',
    filename: '[name]-[hash].js'
  },
  module: moduleBrowser,
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.i18n.html',
      locale: project.ws.i18n.locales[0],
      locales: project.ws.i18n.locales,
      chunks: ['i18n', 'indexI18n'],
      chunksSortMode: (a: any) => a.names[0] === 'index' ? 1 : 0
    }),
    extractCssHashPlugin,
    loaderOptionsPlugin,
    defineProductionPlugin,
    minifyJsPlugin,
    productionOptionsPlugin
    // defineLocalesPlugin
  ],
  externals: [project.ws.i18n.module],
  resolveLoader,
  resolve,
  devtool: devtoolProduction
} : ({} as any);

const getUnlocalizedBrowserDevOptions = (): WebpackSingleConfig => ({
  entry: project.ws.srcEntry,
  // would be an webpack agnostic module in the future https://github.com/webpack/webpack/issues/2933
  // this is not really useful until then
  output: {
    ...outputDev,
    libraryTarget: 'umd',
    library: project.name
  },
  module: moduleBrowser,
  plugins: [
    extractCssPlugin,
    loaderOptionsPlugin
  ],
  externals: externalsBrowser,
  performance: {
    hints: false
  },
  resolveLoader,
  resolve,
  devtool
});

const getLocalizedBrowserDevOptions = (locale: string): WebpackSingleConfig => {
  const options = getUnlocalizedBrowserDevOptions();
  options.output = {
    ...options.output,
    path: join(process.cwd(), project.ws.distDir, locale)
  };
  options.resolve = {
    ...options.resolve,
    alias: {
      [project.ws.i18n!.module]: `${process.cwd()}/${project.ws.i18n!.distDir}/${locale}.js`
    }
  };
  return options;
};

export const getBrowserDevOptions = (locales: Array<string> = getDefaultLocales()): WebpackConfig =>
  locales.length ? locales.map(getLocalizedBrowserDevOptions) : getUnlocalizedBrowserDevOptions();

const getUnlocalizedBrowserReleaseOptions = (): WebpackSingleConfig => ({
  entry: project.ws.srcEntry,
  // useful for people without a build pipeline
  output: {
    ...outputRelease,
    libraryTarget: 'umd',
    library: project.name
  },
  module: browserReleaseModule,
  plugins: [
    extractCssPlugin,
    loaderOptionsPlugin,
    defineProductionPlugin,
    minifyJsPlugin
  ],
  externals: externalsBrowser,
  resolveLoader,
  resolve,
  devtool: devtoolProduction
});

const getLocalizedBrowserReleaseOptions = (locale: string): WebpackSingleConfig => {
  const options = getUnlocalizedBrowserReleaseOptions();
  options.output = {
    ...options.output,
    path: join(process.cwd(), project.ws.distReleaseDir, locale)
  };
  options.resolve = {
    ...options.resolve,
    alias: {
      [project.ws.i18n!.module]: `${process.cwd()}/${project.ws.i18n!.distDir}/${locale}.js`
    }
  };
  return options;
};

export const getBrowserReleaseOptions = (locales: Array<string> = getDefaultLocales()): WebpackConfig =>
  locales.length ? locales.map(getLocalizedBrowserReleaseOptions) : getUnlocalizedBrowserReleaseOptions();

const getUnlocalizedBrowserUnitOptions = (): WebpackSingleConfig => ({
  entry: project.ws.unitEntry,
  output: {
    ...outputTest,
    libraryTarget: 'umd',
    library: project.name
  },
  module: moduleBrowser,
  plugins: [
    extractCssPlugin,
    loaderOptionsPlugin
  ],
  externals: enzymeExternals,
  performance: {
    hints: false
  },
  resolveLoader,
  resolve,
  devtool
});

const getLocalizedBrowserUnitOptions = (): WebpackSingleConfig => {
  const options = getUnlocalizedBrowserUnitOptions();
  options.resolve = {
    ...options.resolve,
    alias: {
      [project.ws.i18n!.module]: `${process.cwd()}/${project.ws.i18n!.distDir}/unit.js`
    }
  };
  return options;
};

export const getBrowserUnitOptions = (): WebpackConfig =>
  project.ws.i18n ? getLocalizedBrowserUnitOptions() : getUnlocalizedBrowserUnitOptions();

export const nodeDevOptions: WebpackSingleConfig = {
  entry: [
    nodeSourceMapEntry,
    project.ws.srcEntry
  ],
  output: {
    ...outputDev,
    libraryTarget: 'commonjs2'
  },
  module: moduleNode,
  externals: externalsNode,
  performance: {
    hints: false
  },
  // in order to ignore built-in modules like path, fs, etc.
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  resolveLoader,
  resolve,
  devtool
};

export const nodeUnitOptions: WebpackSingleConfig = {
  entry: [
    nodeSourceMapEntry,
    project.ws.unitEntry
  ],
  output: {
    ...outputTest,
    libraryTarget: 'commonjs2'
  },
  module: moduleNode,
  externals: externalsNode,
  performance: {
    hints: false
  },
  // in order to ignore built-in modules like path, fs, etc.
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  resolveLoader,
  resolve,
  devtool
};
