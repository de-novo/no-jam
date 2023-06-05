const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [N, K] = input[0].split(" ").map(Number);
const A = input[1].split(" ").map(Number);

class Compartment {
    info = [0, 0];
    constructor(durability) {
        this.info[0] = durability;
    }

    putOn() {
        if (this.info[0] > 0) {
            this.info[1] = 1;
            this.info[0] = this.info[0] - 1;
        }
    }
    putDown() {
        if (this.info[1] === 1) this.info[1] = 0;
    }
}

class ConveyorBelt {
    stage = 1;
    constructor(N, K, durabilitys) {
        this.belt = new Array(2 * N)
            .fill(0)
            .map((_, i) => new Compartment(durabilitys[i]));

        this.downLocationBefore = new Array(N)
            .fill(0)
            .map((_, i) => i)
            .reverse();

        this.downLocation = N - 1;

        this.upLocation = 0;

        this.status = K;
    }
    onStage() {
        this.roll();
        for (const index of this.downLocationBefore) {
            if (this.belt[index].info[1] > 0) {
                const nextIndex = index + 1;
                if (
                    this.belt[nextIndex].info[0] > 0 &&
                    this.belt[nextIndex].info[1] === 0
                ) {
                    this.belt[nextIndex].putOn();
                    this.belt[index].putDown();
                }
            }
        }

        if (this.belt[0].info[0] > 0) {
            this.belt[0].putOn();
        }
        this.putDown();

        if (
            this.belt.filter((compartment) => compartment.info[0] === 0)
                .length >= K
        )
            return 1;
        this.stage = this.stage + 1;
    }
    roll() {
        const temp = this.belt.pop();
        this.belt.unshift(temp);
        this.putDown();
    }
    putDown() {
        this.belt[this.downLocation].putDown();
    }
}

const con = new ConveyorBelt(N, K, A);

while (1) {
    const res = con.onStage();

    if (res === 1) {
        break;
    }
}
console.log(con.stage);
