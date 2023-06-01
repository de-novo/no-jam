/**
 * 
 * 문제
    수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 0초 후에 2*X의 위치로 이동하게 된다.

    수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

    입력
    첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.
*/

// 우선순위큐 문제임.
// 문제풀기전 파악을 했으나. 큐구현을 잘못하여 고생함.

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [N, K] = input[0].split(" ").map(Number);
const pq = [];
const visit = [];
// let time = Infinity;

let locationAndDistanceAndT = [N, 0];
pq[0] = locationAndDistanceAndT;
visit[N] = 1;
while (pq.length) {
    const [cur, time] = pq.shift();
    if (cur === K) return console.log(time);
    for (next of [cur * 2, cur + 1, cur - 1]) {
        if (!visit[next] && next <= 100000 && next >= 0) {
            if (next === cur * 2) pq.unshift([next, time]);
            else pq.push([next, time + 1]);
        }
    }
}
