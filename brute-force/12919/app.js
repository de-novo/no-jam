const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [S, T] = fs.readFileSync(filePath).toString().split("\n");
let answer = 0;

dfs(T);

console.log(answer);

function dfs(t) {
    if (S === t) {
        answer = 1;

        return;
    }

    if (t.length === 0) return;

    if (t[t.length - 1] === "A") dfs(t.slice(0, t.length - 1));

    if (t[0] === "B") dfs([...t.slice(1)].reverse().join(""));
}
