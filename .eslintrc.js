module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    _: false,
  },
  plugins: ["prettier", "html", "css"],
  extends: ["eslint:recommended", "plugin:css/standard"],
  rules: {
    "no-console": "off",
    "no-debugger": "off", // 디버거 사용유무(추가)
    "no-unexpected-multiline": "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false, // '' 사용유무
        semi: true, // ; 사용유무
        useTabs: false,
        tabWidth: 2,
        trailingComma: "all", //코드소스 뒤에 , 자동으로 넣을지
        printWidth: 150,
        bracketSpacing: true,
        arrowParens: "avoid",
        endOfLine: "auto", //async 사용시 에러 않나게
      },
    ],
  },
  parserOptions: {
    sourceType: "module",
    parser: "babel-eslint",
    ecmaVersion: 2021,
  },
  overrides: [
    {
      //테스트 파일에서 jest, mocha 적용
      files: ["test/**/*.{j,t}s?(x)", "test/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
        mocha: true,
      },
    },
    {
      //소스 파일에서 es 적용, node 비적용
      files: ["src/**/*.{j,t}s?(x)"],
      env: {
        node: false,
        browser: true,
        es2021: true,
      },
    },
  ],
};
