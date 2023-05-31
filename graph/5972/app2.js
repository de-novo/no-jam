const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [graphData, ...edgeData] = input;

const [nodeNum, edgeNum] = graphData.split(" ").map(Number);

class Node {
    constructor() {
        this.edges = new Map(); // Edge info will be stored as {destination: cost}
    }
    //전코드와의 차이점, cost를 전부 가지고있지 않음.
    addEdge(dest, cost) {
        this.edges.set(dest, cost);
    }
}

class Graph {
    constructor(nodeNum) {
        //노드 초기화
        this.nodes = new Array(nodeNum);
        for (let i = 0; i < nodeNum; i++) {
            this.nodes[i] = new Node();
        }
    }

    addEdge(source, dest, cost) {
        this.nodes[source - 1].addEdge(dest - 1, cost);
        this.nodes[dest - 1].addEdge(source - 1, cost);
    }

    getShortestPath() {
        const start = 0;
        const end = this.nodes.length - 1;
        const dist = new Array(this.nodes.length).fill(Infinity);
        const queue = [{ node: start, cost: 0 }];

        dist[start] = 0;

        while (queue.length > 0) {
            queue.sort((a, b) => a.cost - b.cost); // Priority Queue: always select shortest distance node

            const { node, cost } = queue.shift();

            if (cost > dist[node]) continue; // If there is already a shorter path, ignore this path

            for (let [nextNode, nextCost] of this.nodes[node].edges) {
                if (cost + nextCost < dist[nextNode]) {
                    // If found shorter path to nextNode
                    dist[nextNode] = cost + nextCost; // Update the shortest path to nextNode
                    queue.push({ node: nextNode, cost: dist[nextNode] }); // Add nextNode to the queue
                }
            }
        }

        return dist[end];
    }
}

const graph = new Graph(nodeNum);

edgeData.forEach((data) => {
    const [node1, node2, price] = data.split(" ").map(Number);
    graph.addEdge(node1, node2, price);
});

console.log(graph.getShortestPath());
console.log(Array.from(5, () => []));
