const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [N, ...D] = input;

const solution = (string, num) => {
    let result1 = Infinity;
    let result2 = -1;
    const str = string.split("");
    const alphabet = new Set(str);
    alphabet.forEach((c) => {
        const cIndex = str
            .map((s, i) => (s === c ? i : undefined))
            .filter((i) => i !== undefined);
        if (cIndex.length >= num)
            cIndex.forEach((v, i) => {
                if (cIndex[i + num - 1]) {
                    const length = cIndex[i + num - 1] - v + 1;

                    result1 = Math.min(result1, length);
                    result2 = Math.max(result2, length);
                }
            });
    });
    if (result2 === -1 || result1 === Infinity) {
        console.log(-1);
    } else {
        console.log(result1, result2);
    }
};
for (let i = 1; i <= N; i++) {
    const str = input[2 * i - 1];
    const num = Number(input[2 * i]);

    solution(str, num);
}
