const a = new Array(1000000).fill(0).map((_, i) => i);
const v = [];
console.time();
// a.forEach((a) => v.push(a + 100));
// a.forEach((a) => console.log(a));
// for (c of a) v.push(c + 100);
for (c of a) console.log(c);
console.timeEnd();
[0, 1, 2, 3, 4, 5, 6, 7];
