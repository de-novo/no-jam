const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [a, s, ...d] = input;

const D = d.map((a) => a.split(" ").map(Number)).sort((a, b) => a[2] - b[2]);
const find = (x) => {
    if (cycles[x] === x) {
        return x;
    } else return find(cycles[x]);
};

const union = (a, b) => {
    const x = find(a);
    const y = find(b);
    if (x === y) return false;
    cycles[y] = x;
    return true;
};
const graph = [];
const cycles = [];
for (let i = 1; i <= parseInt(a); i++) {
    cycles[i] = i;
}

D.forEach((v) => {
    if (union(v[0], v[1])) graph.push(v);
});

console.log(graph.reduce((prev, cur) => cur[2] + prev, 0));
