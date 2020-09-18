import NumberGrid from '@/puzzle/NumberGrid';
import SeedConsumer from '@/puzzle/SeedConsumer';
import factorial from '@/puzzle/factorial';

const GRID_SIZE = 7;

function isValidSeed(seed) {
    const n = GRID_SIZE;
    return seed >= 0 && seed < factorial(n - 1) *  factorial(n) * (n - 3) * n * 4;
}

function generateGrid(seed) {
    const seedConsumer = new SeedConsumer(seed);
    const grid = new NumberGrid(GRID_SIZE);

    // Set up grid so that there is a guaranteed solution (i.e., contains 1-2-4 somewhere)
    grid.swapColumns(2, 3);

    // Apply row/column permutations while maintaining solveability
    const columnPermutation = seedConsumer.nextPermutation(GRID_SIZE - 3)
        .map(i => i + 3);
    columnPermutation.unshift(0, 1, 2);
    grid.permuteColumns(columnPermutation);
    grid.permuteRows(seedConsumer.nextPermutation(GRID_SIZE));

    // Shift rows and columns while maintaining solveability
    grid.shiftColumns(seedConsumer.nextInt(GRID_SIZE - 3));
    grid.shiftRows(seedConsumer.nextInt(GRID_SIZE));

    // Final touch
    switch (seedConsumer.nextInt(4)) {
        case 1:
            grid.invert();
            break;
        case 2:
            grid.invert();
            grid.mirrorVertically();
            break;
        case 3:
            grid.mirrorHorizontally();
            break;
        default:
            break;
    }

    return grid;
}

export default generateGrid;
export {
    isValidSeed,
};
