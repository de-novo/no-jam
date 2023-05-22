const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [num, ...treeData] = input;
const data = treeData.map((d) => d.split(" "));

// index 0은 편리상 null로 채워둔다.
const tree = [null];

const addTreeNodes = (tree, node, left, right) => {
    if (Array.isArray(tree)) {
        if (tree.length === 1) {
            tree[1] = node;
            tree[2] = left;
            tree[3] = right;
        } else {
            const index = tree.findIndex((n) => n === node);
            tree[index * 2] = left;
            tree[index * 2 + 1] = right;
        }
    }
};

data.forEach((d) => {
    const [node, left, right] = d;
    addTreeNodes(tree, node, left, right);
});

const preorder = (tree, index = 1, string = []) => {
    if (!tree[index] || tree[index] === ".") return;
    string.push(tree[index]);
    preorder(tree, index * 2, string);
    preorder(tree, index * 2 + 1, string);
    if (index === 1) console.log(string.join(""));
};
const inorder = (tree, index = 1, string = []) => {
    if (!tree[index] || tree[index] === ".") return;
    inorder(tree, index * 2, string);
    string.push(tree[index]);
    inorder(tree, index * 2 + 1, string);
    if (index === 1) console.log(string.join(""));
};
const postorder = (tree, index = 1, string = []) => {
    if (!tree[index] || tree[index] === ".") return;
    postorder(tree, index * 2, string);
    postorder(tree, index * 2 + 1, string);
    string.push(tree[index]);
    if (index === 1) console.log(string.join(""));
};
preorder(tree);
inorder(tree);
postorder(tree);
