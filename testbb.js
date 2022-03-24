var babel = require("@babel/core");
const filename = "./test.js";
const fs = require('fs');
const source = fs.readFileSync(filename, "utf8");



var ast = require("@babel/parser").parse(source, {
  sourceType: "module",
  plugins: [
    "jsx",
    "flow"
  ],
  retainLines: true,
  minified: true
});
console.log("ast", ast);
const cc = babel.transformFromAstSync(ast, source, {
  filename,
  babelrc: false,
  plugins: [["./bp.js", {mm: "mahesh"}]],
  configFile: false,
});

fs.writeFile('./test-compiled.js', cc.code, 'utf8', function() {
  console.log("SUCCESS! test-compiled.js file generated.");
})