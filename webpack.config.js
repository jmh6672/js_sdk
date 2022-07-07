const path = require("path");
const webpack = require("webpack");
const path_component = path.resolve(__dirname, "src");
// const path_style = path.resolve(__dirname, "src/css");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  //배포 프로파일 명시
  // mode: "production",
  mode: "development",
  target: "web",
  plugins: [
    new miniCssExtractPlugin({ filename: "style.css" }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.DefinePlugin({
      SDK_VERSION: JSON.stringify(require("./package.json").version),
    }),
  ],
  // 하나의 모듈로 패키지 된 후에 console등의 기능에서 원본 소스의 위치를 알 수 없는데
  // sourcemap 이 찾을 수 있도록 해준다.
  devtool: "source-map",
  entry: [
    path_component + "/index.js",
    // path_style + "/style.sass"
  ],
  // 빌드 결과물에 대한 설정
  output: {
    path: path.resolve(__dirname, "dist"), //빌드된 파일 경로
    filename: "haram.js", //빌드된 파일명
    library: "Haram", //빌드된 라이브러리명 (모듈명)
    libraryTarget: "umd", //모듈형식을 지정한다. (node, web, umd)등
  },
  // js 프레임워크 별로 사용하는 기능이 다를때 target언어에 맞게 convert 해줄 수 있도록 도와준다.
  resolve: {
    fallback: {
      assert: require.resolve("assert"),
      buffer: require.resolve("buffer"),
      crypto: require.resolve("crypto-browserify"),
      constants: require.resolve("constants-browserify"),
      url: require.resolve("url"),
      util: require.resolve("util"),
      vm: require.resolve("vm-browserify"),
      zlib: require.resolve("browserify-zlib"),
      fs: false,
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /node_modules/,
        use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
};
