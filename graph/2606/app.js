const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, ...D] = input;

const graph = Array.from(Array(Number(N) + 1), () => []);

D.forEach((d) => {
    const [n1, n2] = d.split(" ").map(Number);

    graph[n1] = [...graph[n1], n2];
    graph[n2] = [...graph[n2], n1];
});

const dfs = (graph, v, visited = Array(Number(N) + 1)) => {
    visited[v] = 1;
    graph[v].forEach((n) => {
        if (!visited[n]) {
            dfs(graph, n, visited);
        }
    });
    return visited;
};
const r = dfs(graph, 1).filter((a) => a).length;
console.log(r > 0 ? r - 1 : 0);
