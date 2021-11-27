const path = require("path");
const nodeExternals = require("webpack-node-externals");
/*
번들 파일에 불필요한 node_modules 를 빼주는 역할을 한다.
SSR은 js 파일이 클라이언트에게 전송되어 실행되기 전까지, 초기화면의 html string만 렌더링해 먼저 보여주는 개념이기에 서버에서 렌더링된 파일에는 node_modules가 필요없다..
*/

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",

  //* node.js 환경에서 돌아갈 파일을 컴파일할 때 쓰는 설정
  target: "node",

  node: false,
  /*
  node.js의 property를 사용할지 말지에 대한 내용이다.
  boolean 혹은 object 값을 할당하시면 되는데, false일 경우 모든 항목을 쓰지않는 것이고 object는 각각을 설정해줄 수 있다.
  false로 설정된 항목은 node.js가 아니라 webpack 규칙으로 처리하는데 __dirname이 대표적임. __dirname을 node.js가 처리할 경우 항상 ‘/’를 반환하고, webpack을 이용해 파일위치를 설정할 것이므로 false 혹은 { __dirname: false } 라고 표기해주면 된다.
   */

  entry: {
    //* express 서버 위치.
    server: "./src/server.tsx",
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    chunkFilename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", "jsx"],
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
  },

  //! 서버에서 필요없는 node_modules 를 제외
  externals: [nodeExternals()],
};
