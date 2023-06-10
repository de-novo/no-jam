const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, K, ...D] = input;
const [m, k] = M.split(" ").map(Number);

const graph = Array.from(Array(Number(N) + 1), () => []);

D.forEach((d) => {
    const [n1, n2] = d.split(" ").map(Number);
    graph[n1] = [...graph[n1], n2];
    graph[n2] = [...graph[n2], n1];
});

const bfs = (graph, v, visited = []) => {
    const queue = [[v, 1]];

    while (queue.length) {
        const [node, d] = queue.shift();
        visited[node] = d;

        graph[node].forEach((q, i) => {
            if (visited[q]) {
                if (visited[q][1] > d + 1) visited[q][1] = d + 1;
                return;
            }
            queue.push([q, d + 1]);
        });
    }
    return visited;
};
console.log(bfs(graph, Number(m))[Number(k)] - 1 || -1);
