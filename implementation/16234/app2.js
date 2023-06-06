const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
const [n, ...D] = input;
const [N, L, R] = n.split(" ").map(Number);
const P = D.map((a) => a.split(" ").map(Number));
class Country {
    near = [];
    population;
    location;
    nearLocaiton = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    constructor(location, population, max) {
        this.location = location; // [0,0]
        this.population = population;

        this.near = this.nearLocaiton
            .map((distance) => [
                distance[0] + location[0],
                distance[1] + location[1],
            ])
            .filter(([x, y]) => x >= 0 && y >= 0 && max >= x && max >= y);
    }
}

class Union {
    constructor(countries) {
        this.countries = countries;
        this.average = Math.floor(
            countries.reduce((prev, cur) => prev + cur.population, 0) /
                countries.length
        );
    }

    set() {
        this.countries.forEach((c) => (c.population = this.average));
    }
}

class World {
    day = 0;
    unions = [];
    constructor(N, L, R, P) {
        this.N = N;
        this.L = L;
        this.R = R;
        this.countries = new Array(N * N).fill(0);
        P.map((row, r) => {
            row.map(
                (population, c) =>
                    (this.countries[r * N + c] = new Country(
                        [r, c],
                        population,
                        N - 1
                    ))
            );
        });
    }

    oneDay() {
        this.setUnions();
        // console.log(this.unions.length);
        if (this.unions.length === 0) {
            return true;
        }

        this.unions.forEach((u) => u.set());
        this.unions = [];
        this.day = this.day + 1;
    }

    setUnions() {
        let visit = new Set();
        this.countries.forEach((a, i) => {
            if (visit.has(i)) return;
            const [union, check] = this.getUnion(a);
            if (union.length > 0) {
                this.unions.push(new Union([a, ...union]));
            }
            check.forEach((i) => visit.add(i));
        });
    }

    getUnion(country, union = [], visit = new Set()) {
        visit.add(this.getCountryIndex(country));

        while (1) {
            const nearCountry = this.getNearCountry(country).filter(
                (c) =>
                    this.compare(country, c) &&
                    !visit.has(this.getCountryIndex(c))
            );
            if (nearCountry.length === 0) break;
            nearCountry.forEach((c) => {
                if (
                    this.compare(country, c) &&
                    !visit.has(this.getCountryIndex(c))
                ) {
                    union.push(c);
                    visit.add(this.getCountryIndex(c));
                    this.getUnion(c, union, visit);
                }
            });
        }
        return [union, Array.from(visit)];
    }

    getNearCountry(country) {
        return country.near.map(([r, c]) => this.countries[this.N * r + c]);
    }
    compare(Country1, Country2) {
        const com = Math.abs(Country1.population - Country2.population);
        return this.L <= com && com <= this.R;
    }
    getCountryIndex(country) {
        return this.N * country.location[0] + country.location[1];
    }
}

const world = new World(N, L, R, P.slice(0, N));
// world.setUnions();

while (1) {
    const result = world.oneDay();
    if (result) break;
}
console.log(world.day);
// console.log(world);
// console.log(world.countries);
