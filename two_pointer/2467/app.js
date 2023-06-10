const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [N, D] = input;
const phs = D.split(" ").map(Number);
let min = Infinity;
let pointer = [0, phs.length - 1];
let result = [0, 0];

while (pointer[0] < pointer[1]) {
    const sum = phs[pointer[0]] + phs[pointer[1]];
    if (Math.abs(sum) < min) {
        min = Math.abs(sum) < min ? Math.abs(sum) : min;
        result = [phs[pointer[0]], phs[pointer[1]]];
    }
    sum > 0 ? pointer[1]-- : pointer[0]++;
}

console.log(result[0], result[1]);
