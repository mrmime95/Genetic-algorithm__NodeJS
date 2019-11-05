import { random, randChar } from './utils';

export default class DNA {
    constructor(num) {
        this.genes = [];
        this.fitness = 0;
        for (let i = 0; i < num; i++) {
            this.genes[i] = randChar();
        }
    }

    setFitness(target) {
        let score = 0;
        this.genes.forEach((gen, index) => {
            gen === target.charAt(index) && ++score;
        });
        this.fitness = score / target.length;
    }

    mutate(mutationRate) {
        this.genes = this.genes.map((gen, index) => (random(1) < mutationRate ? randChar() : gen));
    }
}
