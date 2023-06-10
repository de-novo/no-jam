const { captureRejectionSymbol } = require("events");
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [N, ...D] = input;

const n = Number(N);

const graph = D.map((d) => d.split("").map(Number)).reduce(
    (p, c) => [...p, ...c],
    []
);

const linked = (i, n) => {
    const link = [];
    const a = i + 1;
    const b = i - 1;
    const c = i + n;
    const d = i - n;

    if (Math.floor(a / n) === Math.floor(i / n) && a <= n * n - 1) {
        link.push(a);
    }
    if (Math.floor(b / n) === Math.floor(i / n) && b >= 0) {
        link.push(b);
    }
    if (c <= n * n - 1) {
        link.push(c);
    }
    if (d >= 0) {
        link.push(d);
    }
    return link;
};

const dfs = (graph, v, visited = []) => {
    const queue = [v];
    while (queue.length) {
        const node = queue.shift();
        if (visited[node]) continue;
        visited[node] = true;

        linked(node, n).forEach((a) => {
            if (!graph[a] || visited[a]) return;
            queue.push(a);
        });
    }
    return visited;
};

const visited = graph.map(() => false);

// dfs(graph, 1, visited);
// dfs(graph, 4, visited);

const result = [];
graph.forEach((n, i) => {
    if (visited[i] || n === 0) return;
    if (!visited[i] && n) {
        const len = dfs(graph, i, visited).filter((a) => a).length;
        result.push(len - result.reduce((p, c) => p + c, 0));
    }
});

result.sort((a, b) => a - b);
console.log(result.length);
result.forEach((a) => console.log(a));
