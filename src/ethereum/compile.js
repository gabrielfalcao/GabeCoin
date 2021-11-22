const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");

fs.removeSync(buildPath);

const icoPath = path.resolve(__dirname, "contracts", "ICO.sol");
const source = fs.readFileSync(icoPath, "utf8");
console.log(`Compiling...`);
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);
console.log(`Done`);

for (let contract in output) {
  let name = contract.replace(":", "");
  let targetPath = path.join(buildPath, `${name}.json`);
  fs.outputJsonSync(targetPath, output[contract]);
  console.log(`Compiled contract ${name}:\n\t${targetPath}`);
}
