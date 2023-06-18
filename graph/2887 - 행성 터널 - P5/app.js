const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [a, ...d] = input;
const parent = new Array(parseInt(a)).fill(0).map((_, i) => i);
// console.log(parent);

const find = (x) => {
    if (parent[x] === x) return x;
    return find(parent[x]);
};
const union = (p1, p2) => {
    const x = find(p1);
    const y = find(p2);
    if (x === y) return false;

    parent[y] = x;
    return true;
};

const getCost = (p1, p2) => {
    return Math.min(
        Math.abs(p1.x - p2.x),
        Math.abs(p1.y - p2.y),
        Math.abs(p1.z - p2.z)
    );
};
const planet = d.map((a) => {
    const [x, y, z] = a.split(" ").map(Number);
    return { x, y, z };
});
const edge = [];

planet.slice(0, planet.length).forEach((a, i) => {
    planet.slice(i + 1, planet.length + 1).forEach((b, j) => {
        edge.push({ from: i, to: i + j + 1, cost: getCost(a, b) });
    });
});

// console.log(planet);
// console.log(edge);

// console.log(edge.sort((a, b) => a.cost - b.cost));

let costs = 0;
edge.sort((a, b) => a.cost - b.cost).forEach((e, i) => {
    const { from, to, cost } = e;
    if (union(from, to)) {
        costs += cost;
    }
});

console.log(costs);
