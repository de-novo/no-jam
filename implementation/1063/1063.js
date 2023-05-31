class Chess {
    x;
    y;
    locationsX = ["A", "B", "C", "D", "E", "F", "G", "H"];
    constructor(location, stone) {
        const [x, y] = location.split("");

        this.x = this.locationsX.findIndex((v) => v === x);
        this.y = Number(y) - 1;
    }
    move(mv) {
        if (mv === "R") this.x++;
        else if (mv === "L") this.x--;
        else if (mv === "B") this.y--;
        else if (mv === "T") {
            this.y++;
        } else if (mv === "RT") {
            this.x++;
            this.y++;
        } else if (mv === "LT") {
            this.x--;
            this.y++;
        } else if (mv === "RB") {
            this.x++;
            this.y--;
        } else if (mv === "LB") {
            this.x--;
            this.y--;
        }
    }
    validateLocation(mv) {
        const [x, y] = this.nextLocation(mv);
        if (x < 0 || x > 7 || y < 0 || y > 7) return false;
        return true;
    }
    nextLocation(mv) {
        if (mv === "R") return [this.x + 1, this.y];
        else if (mv === "L") return [this.x - 1, this.y];
        else if (mv === "B") return [this.x, this.y - 1];
        else if (mv === "T") return [this.x, this.y + 1];
        else if (mv === "RT") return [this.x + 1, this.y + 1];
        else if (mv === "LT") return [this.x - 1, this.y + 1];
        else if (mv === "RB") return [this.x + 1, this.y - 1];
        else if (mv === "LB") return [this.x - 1, this.y - 1];
    }
    nextLocationString(mv) {
        const [x, y] = this.nextLocation(mv);
        return `${this.locationsX[x]}${y + 1}`;
    }
    get location() {
        return `${this.locationsX[this.x]}${this.y + 1}`;
    }
}

class Stone extends Chess {}
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [info, ...mv] = input;
const [chessLocation, stoneLocation, n] = info.split(" ");

const chess = new Chess(chessLocation);
const stone = new Stone(stoneLocation);

for (let i = 0; i < n; i++) {
    // if(chess.nextLocation(mv[i]) === stone.location) {
    if (chess.nextLocationString(mv[i]) === stone.location) {
        if (!chess.validateLocation(mv[i])) continue;
        if (!stone.validateLocation(mv[i])) continue;
        stone.move(mv[i]);
    }
    if (!chess.validateLocation(mv[i])) continue;
    chess.move(mv[i]);
}

console.log(chess.location);
console.log(stone.location);
