const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [N, K] = input[0].split(" ").map(Number);

class Heap {
    constructor(priority) {
        this.heap = [];
        this.priority = priority;
    }
    get size() {
        return this.heap.length;
    }
    insert(data) {
        if (this.size === 0) this.heap[0] = data;
        else this.heap.push(data);
        this.heapifyUp();
        return;
    }

    remove() {
        if (this.size === 0) return undefined;
        const data = this.heap[0];
        this.heap[0] = this.heap[this.size - 1];
        this.heap.pop();
        this.heapifyDown();
        return data;
    }

    peak() {
        if (this.size === 0) return;
        return this.heap[0];
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return index * 2 + 1;
    }

    getRightChildIndex(index) {
        return index * 2 + 2;
    }

    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }
    heapifyUp() {
        let index = this.size - 1;
        while (
            index > 0 &&
            this.priority(
                this.heap[index],
                this.heap[this.getParentIndex(index)]
            )
        ) {
            this.swap(index, this.getParentIndex(index));
            index = this.getParentIndex(index);
        }
    }
    heapifyDown() {
        let index = 0;
        const count = this.size;
        const rootNode = this.heap[index];
        while (
            (this.getLeftChildIndex(index) < count &&
                this.priority(
                    this.heap[this.getLeftChildIndex(index)],
                    rootNode
                )) ||
            (this.getRightChildIndex(index) < count &&
                this.priority(
                    this.heap[this.getRightChildIndex(index)],
                    rootNode
                ))
        ) {
            const smallerPriority =
                this.getRightChildIndex(index) < count &&
                this.priority(
                    this.heap[this.getRightChildIndex(index)],
                    this.heap[this.getLeftChildIndex(index)]
                )
                    ? this.getRightChildIndex(index)
                    : this.getLeftChildIndex(index);

            this.swap(index, smallerPriority);
            index = smallerPriority;
        }
    }
}

const priority = (data1, data2) => {
    return data1[1] < data2[1];
};

const pq = new Heap(priority);
const visit = Array(100001).fill(false);
const data = [N, 0];
pq.insert(data);

while (true) {
    const [cur, time] = pq.remove();

    if (visit[cur]) continue; // 이미 방문한 경우 넘어간다.
    visit[cur] = true;

    if (cur === K) {
        console.log(time);
        break;
    }

    for (nextData of [
        [cur * 2, time],
        [cur + 1, time + 1],
        [cur - 1, time + 1],
    ]) {
        const [next, nextTime] = nextData;

        if (next >= 0 && next <= 100000 && !visit[next]) {
            pq.insert([next, nextTime]);
        }
    }
}
