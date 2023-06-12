const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [N, ...stairs] = input;

const D = stairs.map(Number);

let dp = [D[0], D[0] + D[1], Math.max(D[0] + D[2], D[1] + D[2])];
dp[2] = Math.max(D[0] + D[2], D[1] + D[2]);

for (let i = 3; i < N; i++) {
    dp[i] = Math.max(dp[i - 3] + D[i - 1] + D[i], dp[i - 2] + D[i]);
}
console.log(dp[Number(N - 1)]);

// 1 2 3 4 5 6 7

// 1 3 4 8

// dp[n]=dp[n-1]+s[n]

// dp[n]=

// d[i-3] s[i-1] s[i]

// d[i-2] s[i]
