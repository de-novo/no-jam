class Heap {
    constructor() {
        this.heap = [];
    }
    get size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.size === 0;
    }
    swap(index1, index2) {
        let temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }
    parentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    leftChildIndex(index) {
        return index * 2 + 1;
    }
    rightChildIndex(index) {
        return index * 2 + 2;
    }
    peek() {
        return this.heap[0];
    }
    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.size - 1;
        const lastInsertedNode = this.heap[index];

        while (
            index > 0 &&
            lastInsertedNode[1] < this.heap[this.parentIndex(index)][1]
        ) {
            this.swap(index, this.parentIndex(index));
            index = this.parentIndex(index);
        }
    }

    remove() {
        const count = this.size;
        const rootNode = this.heap[0];

        if (count <= 0) return undefined;
        if (count === 1) this.heap = [];
        else {
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        }
        return rootNode;
    }

    heapifyDown() {
        let index = 0;
        const count = this.size;
        const rootNode = this.heap[index];

        while (
            this.leftChildIndex(index) < count &&
            (rootNode[1] > this.heap[this.leftChildIndex(index)][1] ||
                (this.rightChildIndex(index) < count &&
                    rootNode[1] > this.heap[this.rightChildIndex(index)][1]))
        ) {
            let smallerChildIndex =
                this.rightChildIndex(index) < count &&
                this.heap[this.rightChildIndex(index)][1] <
                    this.heap[this.leftChildIndex(index)][1]
                    ? this.rightChildIndex(index)
                    : this.leftChildIndex(index);

            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }
}

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, ...edges] = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, m] = N.split(" ").map(Number);
const graph = Array.from(Array(n + 1), () => []);
const dist = Array(n + 1).fill(Infinity);
const pq = new Heap();
for (let i = 0; i < m; i++) {
    const [a, b, c] = edges[i].split(" ").map(Number);
    graph[a].push([b, c]);
    graph[b].push([a, c]);
}

dist[1] = 0;
pq.insert([1, 0]);
console.log(graph);
console.log(pq.heap);
console.log(dist);
while (!pq.isEmpty()) {
    // console.log(pq.heap);

    console.log("heap", pq.heap);
    console.log("dist", dist);
    const [current, distance] = pq.remove();
    if (dist[current] < distance) continue;

    for (const [nextNode, nextCost] of graph[current]) {
        const cost = distance + nextCost;
        if (dist[nextNode] > cost) {
            dist[nextNode] = cost;
            pq.insert([nextNode, cost]);
        }
    }
}
// [1,0]    dist [-,0,-,-,-,-,-]
// [2,1] [4,4] <- 둘다 무한대보다 작기때문에 인서트 (1과 연결된 노드 정보임.) dist [-,0,1,-,4,-,-]
// [4,1] - 4,1인이유는 (1-(1)->2-(0)->4) [4,4] [3,7] // 인서트후 우선순위에 따라 정렬   [-,0,1,7,1,-,-]
// [4,4] [3,5] [5,4] [3,7]  [-,0,1,5,1,4,-]
// [5,4] [3,5] [3,7] //remove후 우선순위에 따른 정렬 [-,0,1,5,1,4,-]
// [3,5] [3,7] [6,5]              [-,0,1,5,1,4,5]
// [6,5] [3,7]              [-,0,1,5,1,4,5]
// [3,7]            [-,0,1,5,1,4,5]