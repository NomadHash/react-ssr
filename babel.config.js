function isWebTarget(caller) {
  return Boolean(caller && caller.target === 'web');
}

function isWebpack(caller) {
  return Boolean(caller && caller.name === 'babel-loader');
}

module.exports = (api) => {
  const web = api.caller(isWebTarget);
  const webpack = api.caller(isWebpack);

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          useBuiltIns: web ? 'entry' : undefined,
          targets: !web ? { node: 'current' } : { chrome: '55' },
          modules: webpack ? false : 'commonjs',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          ssr: true,
        },
      ],
      '@loadable/babel-plugin',
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            '@src': './src',
            '@components': './src/components',
            '@assets': './src/assets',
            '@lib': './src/lib',
            '@pages': './src/pages',
            '@store': './src/store',
          },
        },
      ],
    ],
  };
};
