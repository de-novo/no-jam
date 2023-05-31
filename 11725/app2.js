const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N = 0;
const input = [];

rl.on("line", (line) => {
    if (!N) {
        N = Number(line);
    } else {
        input.push(line);
        if (input.length === N - 1) {
            main();
        }
    }
});

const main = () => {
    const nodes = input;
    const tree = [null];
    const haveLeft = (tree, index) => (tree[index * 2] ? true : false);
    nodes.map((node, i) => {
        const [node1, node2] = node.split(" ").map(Number);
        if (i === 0) {
            node1 === 1 ? (tree[1] = node1) : (tree[1] = node2);
            node1 === 1 ? (tree[2] = node2) : (tree[2] = node1);
            node2 === 1 ? (tree[1] = node2) : (tree[1] = node1);
            node2 === 1 ? (tree[2] = node1) : (tree[2] = node2);
        } else {
            tree.forEach((n, i) => {
                if (n === node1) {
                    haveLeft(tree, i)
                        ? (tree[i * 2 + 1] = node2)
                        : (tree[i * 2] = node2);
                } else if (n === node2) {
                    haveLeft(tree, i)
                        ? (tree[i * 2 + 1] = node1)
                        : (tree[i * 2] = node1);
                }
            });
        }
    });

    const map = {};
    let result = ``;
    Array(Number(N))
        .fill(0)
        .forEach((_, i) => {
            const n = i + 2;
            if (map[n]) return (result += map[n] + "\n");
            tree.forEach((node, j) => {
                if (!node) return;
                if (map[node]) return;
                if (j === 0) return;
                if (node === n)
                    return (result += tree[Math.floor(j / 2)] + "\n");
                if (!map[node]) map[node] = tree[Math.floor(j / 2)];
                // console.log("map");
            });
        });

    console.log(result);
};
