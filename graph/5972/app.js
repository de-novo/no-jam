const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [graphData, ...edgeData] = input;

const [nodeNum, edgeNum] = graphData.split(" ").map(parseInt);
//memory issue
class Graph {
    startNode = 0;
    constructor(nodeNum) {
        //-1 = 연결되지않은 노드
        this.graphTable = new Array(nodeNum)
            .fill(0)
            .map((_, i) =>
                new Array(nodeNum)
                    .fill(0)
                    .map((_, j) => (i === j ? 0 : Infinity))
            );
        this.targetNode = nodeNum - 1;
    }

    addNode(node1, node2, price) {
        this.graphTable[node1 - 1][node2 - 1] = price;
        this.graphTable[node2 - 1][node1 - 1] = price;
    }
    getShortest() {
        let distanceTable = [...this.graphTable[this.startNode]];
        let visit = new Array(distanceTable.length).fill(0);
        visit[this.startNode] = 1;
        distanceTable[this.startNode] = 0;

        let now = this.startNode;
        let min = Math.min(
            ...distanceTable.map((d, i) => (i === now ? Infinity : d))
        );
        let distanceStack = min;
        let idx = distanceTable.findIndex(
            (d, i) => d === min && visit[i] !== 1
        );
        for (let i = 0; i < distanceTable.length; i++) {
            now = idx;
            if (now === -1) {
                break;
            }
            visit[now] = 1;
            const nowTable = [...this.graphTable[now]];
            min = Math.min(
                ...nowTable.map((d, i) => (visit[i] === 1 ? Infinity : d))
            );
            idx = nowTable.findIndex((d, i) => d === min && visit[i] !== 1);

            distanceTable = nowTable.map((d, i) => {
                return visit[i] === 0 && distanceTable[i] > distanceStack + d
                    ? distanceStack + d
                    : distanceTable[i];
            });
            distanceStack += min;
        }
        return distanceTable[this.targetNode];
    }
}

const graph = new Graph(nodeNum);
// console.log(graph.graphTable);
edgeData.forEach((data) => {
    const [node1, node2, price] = data.split(" ").map(Number);
    graph.addNode(node1, node2, price);
});

console.log(graph.getShortest());
