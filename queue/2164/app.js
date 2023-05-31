const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [data] = fs.readFileSync(filePath).toString().split("\n");

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(data) {
        const node = new Node(data);
        if (this.head === null) {
            this.head = node;
            this.head.next = null;
        } else {
            this.tail.next = node;
        }

        this.tail = node;
        this.length++;
    }
    pop() {
        const popData = this.head;
        this.head = this.head.next;
        this.length--;
        return popData.data;
    }
    shuffle() {
        this.push(this.pop());
    }
}

const queue = new Queue();

new Array(Number(data)).fill(0).forEach((_, i) => {
    queue.push(i + 1);
});

while (queue.length !== 1) {
    queue.pop();
    queue.shuffle();
}
console.log(queue.pop());
