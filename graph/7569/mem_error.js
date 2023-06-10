const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [N, ...D] = input;
const [n, m, h] = N.split(" ").map(Number);
const graph = D.map((d) => d.split(" ").map(Number)).reduce(
    (p, c) => [...p, ...c],
    []
);

const linked = (i, n, m, h) => {
    const box = n * m;
    const len = box * h;
    const link = [];
    const a = i + 1;
    const b = i - 1;
    const c = i + n;
    const d = i - n;
    const e = i + box;
    const f = i - box;

    if (Math.floor(a / n) === Math.floor(i / n) && a <= len - 1) {
        link.push(a);
    }
    if (Math.floor(b / n) === Math.floor(i / n) && b >= 0) {
        link.push(b);
    }
    if (
        c <= Math.floor(i / box) * box + box - 1 &&
        Math.floor(c / box) === Math.floor(i / box)
    ) {
        link.push(c);
    }
    if (
        d >= Math.floor(i / box) * box &&
        Math.floor(d / box) === Math.floor(i / box)
    ) {
        link.push(d);
    }
    if (e < len) link.push(e);
    if (0 <= f) link.push(f);
    return link;
};
const visited = graph.map((a) => (a === -1 ? true : false));
const bfs_s = (graph, v, visited = [], day = 0) => {
    let t = false;
    if (graph[v] === 1 && !visited[v]) {
        visited[v] = true;
        linked(v, n, m, h).forEach((a) => {
            if (graph[a] === 0) {
                graph[a] = 1;
            }
        });
        t = true;
    }
    return t;
};
let day = 0;
while (true) {
    let t = false;
    if (!graph.includes(0)) {
        break;
    }
    for (let i = 0; i < graph.length; i++) {
        if (graph[i] === 1 && !visited[i]) {
            t = bfs_s(graph, i, visited);
        }
    }

    if (!t && graph.includes(0)) {
        day = -1;
        break;
    }

    day++;
}
console.log(day);
