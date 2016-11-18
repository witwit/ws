import { join } from 'path';
import webpack, { DefinePlugin, optimize, Entry, Output } from 'webpack';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import WebpackNodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import { resolve as resolveFile } from '../resolve';
import { toIntlLocale } from '../intl';
import { project } from '../../project';

/**
 * We make some properties of `webpack.Configuration` mandatory. It is easier for future usage, so we don't
 * need to check, if they are available or not.
 */
export interface WebpackConfiguration extends webpack.Configuration {
  entry: string | Array<string> | webpack.Entry;
  output: webpack.Output;
}

const nodeSourceMapEntry = 'source-map-support/register';

const output = {
  filename: 'index.js',
  // removes tabs (better for multiline strings)
  sourcePrefix: ''
};

const outputDev = Object.assign({}, output, {
  path: join(process.cwd(), project.ws.distDir)
});

export const outputRelease = Object.assign({}, output, {
  path: join(process.cwd(), project.ws.distReleaseDir)
});

const outputTest = Object.assign({}, output, {
  path: join(process.cwd(), project.ws.distTestsDir)
});

const babelNode = {
  presets: [
    resolveFile('@niftyco/babel-node'),
    resolveFile('babel-preset-stage-0')
  ],
  plugins: [
    resolveFile('babel-plugin-transform-decorators-legacy')
  ]
};

const babelBrowser = {
  presets: [
    [ resolveFile('babel-preset-es2015') , { modules: false } ],
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
  options: Object.assign({}, babelNode, { cacheDirectory: true })
};

export const jsLoaderBrowser = {
  test: /\.js(x?)$/,
  exclude: new RegExp(`(node_modules|${project.ws.i18n ? project.ws.i18n.locales.map(locale => `${project.ws.i18n!.distDir}\/locale`).join('|') : ''})`),
  loader: 'babel-loader',
  options: Object.assign({}, babelBrowser, { cacheDirectory: true })
};

export const tsLoaderNode = {
  test: /\.ts(x?)$/,
  loader: 'awesome-typescript-loader',
  options: {
    useBabel: true,
    babelOptions: babelNode,
    useCache: true,
    cacheDirectory: 'node_modules/.cache/awesome-typescript-loader'
  }
};

export const tsLoaderBrowser = {
  test: /\.ts(x?)$/,
  loader: 'awesome-typescript-loader',
  options: {
    useBabel: true,
    babelOptions: babelBrowser,
    useCache: true,
    cacheDirectory: 'node_modules/.cache/awesome-typescript-loader'
  }
};

export const jsonLoader = {
  test: /\.json$/,
  loader: 'json-loader'
};

export const cssLoader = {
  test: /\.css$/,
  loader: ExtractTextWebpackPlugin.extract('css-loader?sourceMap&context=/!postcss-loader?sourceMap')
};

export const lessLoader = {
  test: /\.less/,
  loader: ExtractTextWebpackPlugin.extract('css-loader?sourceMap&context=/!postcss-loader?sourceMap!less-loader?sourceMap')
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

export const postcssPlugin = new (webpack as any).LoaderOptionsPlugin({
  options: {
    postcss: () => [
      autoprefixer({
        browsers: project.ws.browsers
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
  ]
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
  function(context, request, callback) {
    if (/\.json$/.test(request)) {
      callback(null, 'commonjs ' + request);
    } else {
      callback();
    }
  },
  // in order to ignore all modules in node_modules folder
  WebpackNodeExternals()
];

export const externalsBrowser = Object.keys(project.dependencies || {}).concat(project.ws.externals ? [
  project.ws.externals
] : []);

const moduleNode = {
  loaders: [
    jsLoaderNode,
    tsLoaderNode
  ]
};

const moduleBrowser = {
  loaders: [
    jsLoaderBrowser,
    tsLoaderBrowser,
    jsonLoader,
    cssLoader,
    lessLoader,
    imageLoader,
    eotLoader,
    woffLoader,
    ttfLoader
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
      chunks: [ chunkKey, 'index' ],
      chunksSortMode: (a, b) => a.names[0] === 'index' ? 1 : 0
    }));
  });
}

const spaEntry = project.ws.i18n ? localizedEntry : project.ws.srcEntry;
const spaIndexHtmlPlugins = project.ws.i18n ? localizedIndexHtmlPlugins : [ indexHtmlPlugin ];

export const spaDevOptions: WebpackConfiguration = {
  entry: spaEntry,
  output: Object.assign({}, outputDev, {
    libraryTarget: 'umd',
    filename: '[name].js'
  }),
  module: moduleBrowser,
  plugins: spaIndexHtmlPlugins.concat([
    extractCssPlugin,
    postcssPlugin
  ]),
  externals: project.ws.i18n ? [ project.ws.i18n.module ] : [],
  resolveLoader,
  resolve,
  devtool
};

export const spaReleaseOptions: WebpackConfiguration = {
  entry: spaEntry,
  output: Object.assign({}, outputRelease, {
    libraryTarget: 'umd',
    filename: '[name]-[hash].js'
  }),
  module: moduleBrowser,
  plugins: spaIndexHtmlPlugins.concat([
    extractCssHashPlugin,
    postcssPlugin,
    defineProductionPlugin,
    minifyJsPlugin,
    productionOptionsPlugin
  ]),
  externals: project.ws.i18n ? [ project.ws.i18n.module ] : [],
  resolveLoader,
  resolve,
  devtool: devtoolProduction
};

export const spaUnitOptions: WebpackConfiguration = {
  entry: project.ws.unitEntry,
  output: outputTest,
  module: moduleBrowser,
  plugins: [
    extractCssPlugin,
    postcssPlugin
  ],
  externals: [],
  resolveLoader,
  resolve: Object.assign({}, resolve, project.ws.i18n ? {
    alias: {
      [project.ws.i18n.module]: `${process.cwd()}/${project.ws.i18n.distDir}/unit.js`
    }
  } : {}),
  devtool
};

export const spaE2eOptions: WebpackConfiguration = {
  entry: [
    nodeSourceMapEntry,
    project.ws.e2eEntry
  ],
  output: Object.assign({}, outputTest, {
    libraryTarget: 'commonjs2'
  }),
  module: moduleNode,
  externals: externalsNode,
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
const defaultLocale = project.ws.i18n && project.ws.i18n.locales[0];
export const spaRootI18nDevOptions: WebpackConfiguration = project.ws.i18n ? {
  entry: {
    indexI18n: project.ws.srcI18nEntry,
    i18n: `./${project.ws.i18n.distDir}/${project.ws.i18n.locales[0]}.js`
  },
  output: Object.assign({}, outputDev, {
    libraryTarget: 'umd',
    filename: '[name].js'
  }),
  module: moduleBrowser,
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.i18n.html',
      locale: project.ws.i18n.locales[0],
      locales: project.ws.i18n.locales,
      chunks: [ 'i18n', 'indexI18n' ],
      chunksSortMode: (a, b) => a.names[0] === 'index' ? 1 : 0
    }),
    extractCssPlugin,
    postcssPlugin
    // defineLocalesPlugin
  ],
  externals: [ project.ws.i18n.module ],
  resolveLoader,
  resolve,
  devtool
} : ({} as any);

export const spaRootI18nReleaseOptions: WebpackConfiguration = project.ws.i18n ? {
  entry: {
    indexI18n: project.ws.srcI18nEntry,
    i18n: `./${project.ws.i18n.distDir}/${project.ws.i18n.locales[0]}.js`
  },
  output: Object.assign({}, outputRelease, {
    libraryTarget: 'umd',
    filename: '[name]-[hash].js'
  }),
  module: moduleBrowser,
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.i18n.html',
      locale: project.ws.i18n.locales[0],
      locales: project.ws.i18n.locales,
      chunks: [ 'i18n', 'indexI18n' ],
      chunksSortMode: (a, b) => a.names[0] === 'index' ? 1 : 0
    }),
    extractCssHashPlugin,
    postcssPlugin,
    defineProductionPlugin,
    minifyJsPlugin,
    productionOptionsPlugin
    // defineLocalesPlugin
  ],
  externals: [ project.ws.i18n.module ],
  resolveLoader,
  resolve,
  devtool: devtoolProduction
} : ({} as any);

export const browserDevOptions: WebpackConfiguration = {
  entry: project.ws.srcEntry,
  // would be an webpack agnostic module in the future https://github.com/webpack/webpack/issues/2933
  // this is not really useful until then
  output: Object.assign({}, outputDev, {
    libraryTarget: 'umd',
    library: project.name
  }),
  module: moduleBrowser,
  plugins: [
    extractCssPlugin,
    postcssPlugin
  ],
  externals: (project.ws.i18n ? [ project.ws.i18n.module ] : []).concat(externalsBrowser),
  resolveLoader,
  resolve,
  devtool
};

export const browserReleaseOptions: WebpackConfiguration = {
  entry: project.ws.srcEntry,
  // useful for people without a build pipeline
  output: Object.assign({}, outputRelease, {
    libraryTarget: 'umd',
    library: project.name
  }),
  module: moduleBrowser,
  plugins: [
    extractCssPlugin,
    postcssPlugin,
    defineProductionPlugin,
    minifyJsPlugin
  ],
  externals: (project.ws.i18n ? [ project.ws.i18n.module ] : []).concat(externalsBrowser),
  resolveLoader,
  resolve,
  devtool: devtoolProduction
};

export const browserUnitOptions: WebpackConfiguration = {
  entry: project.ws.unitEntry,
  output: Object.assign({}, outputTest, {
    libraryTarget: 'umd',
    library: project.name
  }),
  module: moduleBrowser,
  plugins: [
    extractCssPlugin,
    postcssPlugin
  ],
  externals: [],
  resolveLoader,
  resolve: Object.assign({}, resolve, project.ws.i18n ? {
    alias: {
      [project.ws.i18n.module]: `${process.cwd()}/${project.ws.i18n.distDir}/unit.js`
    }
  } : {}),
  devtool
};

export const nodeDevOptions: WebpackConfiguration = {
  entry: [
    nodeSourceMapEntry,
    project.ws.srcEntry
  ],
  output: Object.assign({}, outputDev, {
    libraryTarget: 'commonjs2'
  }),
  module: moduleNode,
  externals: externalsNode,
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

export const nodeUnitOptions: WebpackConfiguration = {
  entry: [
    nodeSourceMapEntry,
    project.ws.unitEntry
  ],
  output: Object.assign({}, outputTest, {
    libraryTarget: 'commonjs2'
  }),
  module: moduleNode,
  externals: externalsNode,
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
