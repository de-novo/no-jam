const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [target, errNum, errs] = input;

const solution = (target, errs) => {
    let clickCount = Math.abs(100 - Number(target));
    for (let i = 0; i < 1000000; i++) {
        const strI = i.toString();
        if (errs.find((num) => strI.includes(num))) {
            continue;
        }

        clickCount = Math.min(
            clickCount,
            Math.abs(i - Number(target)) + strI.length
        );
    }
    console.log(clickCount);
};
solution(target, errs.split(" "));
