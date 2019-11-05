import DNA from './DNA';
import { random, floor } from './utils';

let target = 'Hello Genetic Algorithm';
let mutationRate = 0.01;
let totalPopulation = 1500;

let population = createPopulation(target.length, totalPopulation);

(function main() {
    let bestMatch = '';
    let generations = 0;

    while (bestMatch !== target) {
        population.map(calcFitness);

        let matingPool = createMatingPool();
        population = population.map((populate, index) => {
            const child = crossover(
                matingPool[floor(random(matingPool.length))],
                matingPool[floor(random(matingPool.length))]
            );
            child.mutate(mutationRate);
            return child;
        });

        bestMatch = population
            .reduce((prev, current) => (prev.fitness > current.fitness ? prev : current)) //DNA object with biggest fitness
            .genes.join('');

        console.log('generation:', generations++, 'best match:', bestMatch);
    }
})();

function createPopulation(length, totalPopulation) {
    const population = [];
    for (let i = 0; i < totalPopulation; ++i) {
        population.push(new DNA(length));
    }
    return population;
}

function createMatingPool() {
    const matingPool = [];
    population.forEach((populate, index) => {
        let nnnn = floor(populate.fitness * 100);
        for (let j = 0; j < nnnn; j++) {
            matingPool.push(populate);
        }
    });
    return matingPool;
}

function calcFitness(populate) {
    return populate.setFitness(target);
}

function crossover(entityA, entityB) {
    const midPoint = floor(random(target.length));
    const childGenes = entityA.genes.map((gen, index) => (index > midPoint ? gen : entityB.genes[index]));
    const child = new DNA(target.length);
    child.genes = childGenes;
    return child;
}
