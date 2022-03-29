const path = require("path");
const NODE_MODULES = path.resolve(__dirname, "..", "node_modules");
const INPUTMASK_DIST_DIR = path.join(
  NODE_MODULES,
  "inputmask",
  "dist",
  "inputmask"
);

module.exports = {
  inputmask: path.join(INPUTMASK_DIST_DIR, "inputmask"),
  "inputmask.dependencyLib": path.join(
    INPUTMASK_DIST_DIR,
    "dependencyLibs",
    "inputmask.dependencyLib"
  ),
  "inputmask.extensions": path.join(INPUTMASK_DIST_DIR, "inputmask.extensions"),
  "inputmask.phone.extensions": path.join(
    INPUTMASK_DIST_DIR,
    "inputmask.phone.extensions"
  ),
  "inputmask.numeric.extensions": path.join(
    INPUTMASK_DIST_DIR,
    "inputmask.numeric.extensions"
  ),
  "inputmask.date.extensions": path.join(
    INPUTMASK_DIST_DIR,
    "inputmask.date.extensions"
  ),
  "inputmask.regex.extensions": path.join(
    INPUTMASK_DIST_DIR,
    "inputmask.regex.extensions"
  ),
  "jquery.inputmask": path.join(INPUTMASK_DIST_DIR, "jquery.inputmask"),
  "inputmask.binding": path.join(
    INPUTMASK_DIST_DIR,
    "bindings",
    "inputmask.binding"
  ),
  "inputmask.phone": path.join(INPUTMASK_DIST_DIR, "phone-codes", "phone"),
  "jquery.slicknav": path.join(
    NODE_MODULES,
    "slicknav",
    "dist",
    "jquery.slicknav"
  ),
  "jquery-toggles": path.join(NODE_MODULES, "jquery-toggles"),
  moment: path.join(NODE_MODULES, "moment", "moment"),
  "eonasdan-datetimepicker": path.join(
    NODE_MODULES,
    "eonasdan-bootstrap-datetimepicker",
    "src",
    "js",
    "bootstrap-datetimepicker"
  ),
};
