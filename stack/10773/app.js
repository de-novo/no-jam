const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [num, ...datas] = input;
const stack = [];

for (let i = 0; i < Number(num); i++) {
    const value = Number(datas[i]);

    if (value === 0) {
        stack.pop();
    } else {
        stack.push(value);
    }
}

// datas.forEach((data) => {
//     const d = Number(data);
//     if (d === 0) {
//         stack.pop();
//         return;
//     }
//     if (1 <= d && d <= 1000000) stack.push(d);
// });
let result = 0;
for (let i = 0; i < stack.length; i += 1) {
    result += stack[i];
}

console.log(result);
