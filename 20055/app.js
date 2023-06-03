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
        if (
            nextCompartment.object === null &&
            nextCompartment.durability >= 1
        ) {
            this.location = nextCompartment;
            this.location.object = this;
            this.location.durability = this.location.durability - 1;
            if (this.location.durability === 0) {
                this.location.belt.status = this.location.belt.status - 1;
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
    upLocaion = 1;
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
            if (this.belt[index].durability > 0) {
                if (this.belt[index].object)
                    this.belt[index].object.move(
                        index === 2 * this.N
                            ? this.belt[1]
                            : this.belt[index + 1]
                    );
            }
        });
        if (this.belt[this.upLocaion].durability)
            this.belt[this.upLocaion].putOn(
                new Robot(this.belt[this.upLocaion])
            );
        if (this.status === 0) return 0;
        this.stage++;
    }
    roll() {
        const upLocaion =
            Math.abs(this.N * 2 + 2 - (this.stage % this.N) * 2) % (this.N * 2);
        const downLocation =
            upLocaion + this.N - 1 > this.N * 2
                ? (upLocaion + this.N - 1) % this.N
                : upLocaion + this.N - 1;
        // Math.abs(this.N * 2 + 1 - this.N - (this.stage % 10)) % 10;
        this.upLocaion = upLocaion === 0 ? this.N * 2 : upLocaion;
        this.downLocation = downLocation === 0 ? this.N * 2 : downLocation;
        this.belt[downLocation].putDown();
    }

    betweenUpAndDown() {
        const startIdx = (3 * this.N - this.stage + 1) % (2 * this.N);
        const inx = startIdx < 0 ? startIdx + 3 * this.N : startIdx;
        return this.belt
            .slice(1 + this.N, this.N * 2 + 1)
            .concat(this.belt.slice(1))
            .concat(this.belt.slice(1, this.N + 1))
            .slice(inx, inx + this.N);
    }
}

// 1 2 3 4 5            1       1 5
// 10 1 2 3 4           2       2 5       9 10
// 9 10 1 2 3           3      3 5         8 10
// 8 10 11 1 2          4      4 6         7 10
// 7 8 9 10 1           5      5 5         6 10
// 6 7 8 9 10           6      6 5
// 5 6 7 8 9            7
// 4 5 6 7 8            8
// 3 4 5 6 7            9
// 2 3 4 5 6            10
// 1 2 3 4 5            11

const con = new ConveyorBelt(N, K, A);
// console.log(con.upLocaion);
while (1) {
    const status = con.onStage();
    // console.log(con.belt);
    if (status === 0) {
        break;
    }
}
console.log(con.stage);
