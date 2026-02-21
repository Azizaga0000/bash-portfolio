const { execSync } = require("node:child_process");
const path = require("node:path");

const root = process.cwd();
const run = (cwd) => {
  execSync("npm install", {
    cwd: path.join(root, cwd),
    stdio: "inherit"
  });
};

run("server");
run("client");
