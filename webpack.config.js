module.exports = function (env) {
  return require(`./webpack.${env.client ? 'client' : env.dev ? 'dev' : 'server'}.js`);
};
