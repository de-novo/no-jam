const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, ...D] = input;

const [n, m, v] = N.split(" ").map(Number);

const graph = Array.from(Array(n + 1), () => []);
D.map((a) => {
    const [node1, node2] = a.split(" ").map(Number);
    graph[node1] = [...graph[node1], node2].sort((a, b) => a - b);
    graph[node2] = [...graph[node2], node1].sort((a, b) => a - b);
});

const dfs = (graph, v, visited = new Array(n + 1).fill(false), result = []) => {
    visited[v] = true;
    result.push(v);
    graph[v].forEach((v) => {
        if (!visited[v]) {
            dfs(graph, v, visited, result);
        }
    });
    return result;
};
const bfs = (graph, v, visited = new Array(n + 1).fill(false), result = []) => {
    const queue = [v];
    while (queue.length) {
        const index = queue.shift();
        if (visited[index]) continue;
        visited[index] = true;
        result.push(index);

        graph[index].forEach((i) => {
            if (visited[i]) {
                return;
            }
            queue.push(i);
        });
    }
    return result;
};
const dfsResult = dfs(graph, v);
console.log(dfsResult.join(" "));
const bfsResult = bfs(graph, v);
console.log(bfsResult.join(" "));
