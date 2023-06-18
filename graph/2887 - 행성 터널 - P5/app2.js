const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift());
let planet = [];
let parent = Array(N);

for(let i=0; i<N; i++) {
    parent[i] = i;
}

for(let i=0; i<N; i++) {
    const [x, y, z] = input[i].split(' ').map(Number);
    planet.push({ idx: i, x, y, z });
}

let edge = [];
planet.sort((a, b) => a.x - b.x).reduce((a, b) => {
    edge.push({ cost: Math.abs(a.x - b.x), a: a.idx, b: b.idx });
    return b;
});
planet.sort((a, b) => a.y - b.y).reduce((a, b) => {
    edge.push({ cost: Math.abs(a.y - b.y), a: a.idx, b: b.idx });
    return b;
});
planet.sort((a, b) => a.z - b.z).reduce((a, b) => {
    edge.push({ cost: Math.abs(a.z - b.z), a: a.idx, b: b.idx });
    return b;
});

edge.sort((a, b) => a.cost - b.cost);

let answer = 0;
for(let {cost, a, b} of edge) {
    if(find(a) !== find(b)) {
        union(a, b);
        answer += cost;
    }
}

function find(x) {
    if(x === parent[x]) return x;
    return parent[x] = find(parent[x]);
}

function union(x, y) {
    x = find(x);
    y = find(y);
    if(x !== y) {
        parent[y] = x;
    }
}

console.log(answer);
