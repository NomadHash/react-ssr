module.exports = function (env) {
  console.log(env);
  return require(`./webpack.${env.client ? "client" : "server"}.js`);
};
