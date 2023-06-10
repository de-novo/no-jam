const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [N, ...D] = input;
const [h, w] = N.split(" ").map(Number);
const blocks = D[0].split(" ").map(Number);

//블록 그리기
// const bucket = new Array(h).fill(new Array(w).fill(0)).map((n, i) => {
//     return blocks.map((b, j) => {
//         return h - i <= b ? Infinity : 1;
//     });
// });

const bucket = new Array(h).fill(new Array(w).fill(0)).map((n, i) => {
    let stack = [];
    let count = 0;
    blocks.forEach((b, j) => {
        if (h - i <= b && stack[stack.length - 1] === Infinity) return;
        if (h - i <= b && stack.length !== 0) {
            count += stack
                .filter((a) => a !== Infinity)
                .reduce(
                    (prev, cur) => (cur === Infinity ? cur : prev + cur),
                    0
                );
            stack = [Infinity];
            return;
        }
        if (h - i <= b) {
            stack.push(Infinity);
            return;
        }
        if (h - i > b && stack.length !== 0) {
            stack.push(1);
            return;
        }
    });
    return count;
});
// console.log(bucket);
console.log(bucket.reduce((prev, cur) => prev + cur, 0));
