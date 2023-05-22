const fs = require("fs");
const filePath = (path) => (process.platform === "linux" ? "/dev/stdin" : path);
const input = (filePath) => fs.readFileSync(filePath).toString();

exports.filePath = filePath;
exports.input = input;
