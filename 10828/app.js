"use strict";
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

class Stack {
    stack = [];
    result = [];
    constructor() {}

    push(num) {
        this.stack.push(num);
        return;
    }
    pop() {
        if (this.stack.length === 0) {
            this.result.push(-1);
            return;
        }

        this.result.push(this.stack[this.stack.length - 1]);
        this.stack.pop();
    }
    size() {
        this.result.push(this.stack.length);
    }
    empty() {
        if (this.stack.length === 0) {
            this.result.push(1);
            return;
        }
        this.result.push(0);
    }
    top() {
        if (this.stack.length === 0) {
            this.result.push(-1);
            return;
        }
        this.result.push(this.stack[this.stack.length - 1]);
    }

    get() {
        console.log(this.result.join("\n"));
    }
}
const [num, ...datas] = input;
const commands = datas.map((command) => command.split(" "));
const stack = new Stack();
commands.forEach((cmd) => {
    if (
        cmd[0] === "push" ||
        cmd[0] === "pop" ||
        cmd[0] === "size" ||
        cmd[0] === "empty" ||
        cmd[0] === "top"
    )
        if (cmd[1]) return stack[cmd[0]](cmd[1]);
        else return stack[cmd[0]]();
});
stack.get();
