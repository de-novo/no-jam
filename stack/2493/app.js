const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [N, D] = input;
// console.log(D);
const data = D.split(" ").map(Number);

const stack = [];
const result = [];
data.forEach((d, i) => {
    if (i === 0) {
        result.push(0);
        stack.push([d, i]);
        return;
    }

    if (stack[stack.length - 1] && stack[stack.length - 1][0] < d) {
        while (stack.length) {
            if (stack[stack.length - 1][0] >= d) {
                break;
            } else {
                stack.pop();
            }
            // if(a>)
        }
        result.push(stack.length === 0 ? 0 : stack[stack.length - 1][1] + 1);
        stack.push([d, i]);
        // console.log(data.slice(0, i + 1));
    } else {
        result.push(stack.length === 0 ? 0 : stack[stack.length - 1][1] + 1);
        stack.push([d, i]);
    }
});

console.log(result.join(" "));
