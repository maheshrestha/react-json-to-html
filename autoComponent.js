const chokidar = require("chokidar");
const fs = require("fs");

const templates = {
  index: (name) =>
    `
import React from 'react';
import './${name}.css';
const ${name} = () => (
  <div className="${name.toLowerCase()}">
    // TODO: write rest of ${name} component
  </div>
);
export default ${name};`,
  test: (name) => `// TODO: TDD
import { shallow, render } from 'enzyme';
import renderer from 'react-test-renderer';
import React from 'react';
import ${name} from '.';
const component = <${name} />;
describe('The ${name} component', () => {
  it('renders correctly', () => {
    const wrapper = render(component);
    expect(wrapper.hasClass('${name.toLowerCase()}')).toBeTruthy();
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});`,
  sass: (name) => `.${name.toLowerCase()}
  color: initial
  background: initial`,
};

const fileExists = (path) => (file) => fs.existsSync(`${path}/${file}`);

const writeToPath = (path) => (file, content) => {
  const filePath = `${path}/${file}`;

  fs.writeFile(filePath, content, (err) => {
    if (err) throw err;
    console.log("Created file: ", filePath);
    return true;
  });
};

function createFiles(path, name) {
  const files = {
    index: "index.jsx",
    test: `${name}.test.js`,
    sass: `${name}.sass`,
  };

  if (name !== "components") {
    const writeFile = writeToPath(path);
    const toFileMissingBool = (file) => !fileExists(path)(file);
    const checkAllMissing = (acc, cur) => acc && cur;

    const noneExist = Object.values(files)
      .map(toFileMissingBool)
      .reduce(checkAllMissing);

    if (noneExist) {
      console.log(`Detected new component: ${name}, ${path}`);
      Object.entries(files).forEach(([type, fileName]) => {
        writeFile(fileName, templates[type](name));
      });
    }
  }
}

const watcher = chokidar
  .watch("src/components/**", { ignored: /node_modules/ })
  .on("addDir", (path, event) => {
    const name = path.replace(/.*\/components\//, "");
    if (!name.includes("/")) createFiles(path, name);
  });
