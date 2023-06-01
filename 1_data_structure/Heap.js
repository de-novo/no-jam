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
    return data1 < data2; // min heap
    // return data1 > data2; // max heap
};
