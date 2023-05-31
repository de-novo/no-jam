const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [num, ...data] = input;
const nodes = data.map(Number);
let addNum = 1;
const stack = [];
const pushAndPop = [];
for (let i = 0; i < num; i++) {
    while (!stack.includes(nodes[i])) {
        stack.push(addNum);
        pushAndPop.push("+");
        addNum++;
    }
    if (stack[stack.length - 1] !== nodes[i]) {
        console.log("NO");
        return;
    }
    stack.pop();
    pushAndPop.push("-");
}
// console.log(pushAndPop);
// console.log(stack);
console.log(pushAndPop.join("\n"));
