const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const T = Number(input[0]);

for (let i = 1; i <= T; i++) {
    const str = input[i * 2 - 1];
    const k = Number(input[i * 2]);

    const solution = (str, k) => {
        let result1 = Infinity;
        let result2 = -1;
        const strArray = str.split("");
        const uniqueChars = new Set(strArray);

        uniqueChars.forEach((char) => {
            const indexes = strArray
                .map((s, i) => (s === char ? i : undefined))
                .filter((i) => i !== undefined);

            if (indexes.length >= k) {
                indexes.forEach((v, idx) => {
                    if (indexes[idx + k - 1] !== undefined) {
                        const length = indexes[idx + k - 1] - v + 1;

                        result1 = Math.min(result1, length);
                        result2 = Math.max(result2, length);
                    }
                });
            }
        });

        if (result1 === Infinity || result2 === -1) {
            console.log(-1);
        } else {
            console.log(result1, result2);
        }
    };

    solution(str, k);
}
