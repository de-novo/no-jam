const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [N, ...D] = input;
const [n, m] = N.split(" ").map(Number);
const graph = D.map((d) => d.split("").map(Number)).reduce(
    (prev, cur) => [...prev, ...cur],
    []
);
const linked = (i, N, M) => {
    const link = [];
    const a = i - M;
    const b = i + M;
    const c = i - 1;
    const d = i + 1;
    // console.log(i, N, M);
    if (a >= 0) link.push(a);
    if (b <= N * M - 1) link.push(b);
    if (Math.floor(c / M) === Math.floor(i / M) && c >= 0) link.push(c);
    if (Math.floor(d / M) === Math.floor(i / M) && d <= N * M - 1) link.push(d);
    return link;
};
const bfs = (graph, v, visited = []) => {
    // if (!visited[v]) {
    //     visited[v] = 1;
    //     result.push(graph[v]);
    //     const linkIndexs = linked();
    // }

    const queue = [[v, graph[v]]];
    while (queue.length) {
        const [i, price] = queue.shift();
        if (visited[i]) continue;
        visited[i] = price;
        const linkIndex = linked(i, n, m);
        linkIndex.forEach((index) => {
            if (graph[index] > 0) {
                if (visited[index]) {
                    if (visited[index] > price + graph[index]) {
                        visited[index] = price + graph[index];
                    }
                    return;
                }
                queue.push([index, price + graph[index]]);
            }
        });
    }
    return visited;
};

const r = bfs(graph, 0);
console.log(r[n * m - 1]);
