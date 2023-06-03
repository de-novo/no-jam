const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [N, K] = input[0].split(" ").map(Number);
const A = input[1].split(" ").map(Number);

class Robot {
    constructor(compartment) {
        this.location = compartment;
    }

    move(nextCompartment) {
        // console.log(nextCompartment);
        // console.log(this.location);
        if (!nextCompartment.object && nextCompartment.durability >= 1) {
            this.location.putDown();
            this.location.object = null;
            this.location = nextCompartment;
            this.location.durability -= 1;
            this.location.object = this;
            if (this.location.durability === 0) {
                this.location.belt.status--;
            }
        }
    }
}

class Compartment {
    object;
    constructor(index, durability, belt) {
        this.durability = durability;
        this.index = index;
        this.belt = belt;
    }

    putOn(robot) {
        this.object = robot;
    }
    putDown() {
        this.object = null;
    }
}

class ConveyorBelt {
    stage = 1;
    upLocation = 1;
    downLocation;
    status = 0;
    constructor(N, K, durabilitys) {
        this.belt = new Array(2 * N + 1)
            .fill(0)
            .map((_, i) =>
                i === 0 ? null : new Compartment(i, durabilitys[i - 1], this)
            );
        this.downLocation = N;
        this.N = N;
        this.status = K;
    }
    onStage() {
        this.roll();
        const nowBetween = this.betweenUpAndDown().reverse();

        nowBetween.forEach(({ index }) => {
            const nextIndex = index + 1 > this.N * 2 ? 1 : index + 1;
            // console.log(nextIndex);
            if (
                this.belt[index].object && // 이동하려는 칸에 로봇이 있을 때
                !this.belt[nextIndex].object // 이동하려는 칸 다음 칸에 로봇이 없을 때
            ) {
                // 이동하려는 칸의 내구도가 1 이상일 때
                this.belt[index].object.move(this.belt[index + 1]);
                if (nextIndex === this.downLocation) {
                    this.belt[nextIndex].putDown();
                }
            }
        });
        if (
            this.belt[this.upLocation].durability > 0 &&
            !this.belt[this.upLocation].object
        ) {
            this.belt[this.upLocation].putOn(
                new Robot(this.belt[this.upLocation])
            );
        }

        if (this.status === 0) return 0;
        this.stage = this.stage + 1;
    }
    roll() {
        const upLocation =
            Math.abs(this.N * 2 + 2 - (this.stage % this.N) * 2) % (this.N * 2);
        const downLocation =
            upLocation + this.N - 1 > this.N * 2
                ? (upLocation + this.N - 1) % this.N
                : upLocation + this.N - 1;
        this.upLocation = upLocation === 0 ? this.N * 2 : upLocation;
        this.downLocation = downLocation === 0 ? this.N * 2 : downLocation;
        this.belt[this.downLocation].putDown();
    }

    betweenUpAndDown() {
        const startIdx = (3 * this.N - (this.stage + 1) + 1) % (2 * this.N);
        const idx = startIdx < 0 ? startIdx + 3 * this.N : startIdx;
        // console.log(
        //     this.belt
        //         .slice(1 + this.N, this.N * 2 + 1)
        //         .concat(this.belt.slice(1))
        //         .concat(this.belt.slice(1, this.N + 1))
        //         .slice(idx, idx + this.N)
        //         .map(({ index }) => index)
        // );
        return this.belt
            .slice(1 + this.N, this.N * 2 + 1)
            .concat(this.belt.slice(1))
            .concat(this.belt.slice(1, this.N + 1))
            .slice(idx, idx + this.N);
    }
}

const con = new ConveyorBelt(N, K, A);
// console.log(con);
// con.roll();
// console.log("roll");
// con.belt[con.upLocation].putOn(new Robot(con.belt[con.upLocation]));

// console.log(con.belt[con.upLocation].object);
// console.log(con.upLocation);

// con.belt[con.upLocation].object.move(con.belt[1]);
// console.log(con.belt[1]);
// console.log(con.belt[6]);
// console.log(con.belt[1].durability);
// console.log(con.status);

// while (con) {
//     // console.log(con.downLocation);
//     const status = con.onStage();
//     if (status === 0) {
//         break;
//     }
// }
con.onStage();
console.log(con.downLocation);
console.log(
    con.belt
        .slice(1)
        .filter((q) => (q.object ? true : false))
        .map((i) => i.index)
);
con.onStage();
console.log(con.downLocation);
console.log(
    con.belt
        .slice(1)
        .filter((q) => (q.object ? true : false))
        .map((i) => i.index)
);
// console.log(con.betweenUpAndDown().map((i) => i.index));

// 1 2 3 4 5 6
// 1 2 1 2 1 2

// 6 1 2 3 4 5
// o
// 1 1 2 1 2 1

// 5 6 1 2 3 4
// o   o
// 0 1 0 1
