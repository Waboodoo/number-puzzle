class SeedConsumer {
    constructor(seed) {
        this.seed = seed;
    }

    nextInt(bound) {
        const result = this.seed % bound;
        this.seed = (this.seed - result) / bound;
        return result;
    }

    nextPermutation(size) {
        const result = new Array(size);
        const available = new Array(size);
        for (let i = 0; i < size; i++) {
            available[i] = i;
        }
        for (let i = 0; i < size; i++) {
            const index = this.nextInt(size - i);
            result[i] = available[index];
            available.splice(index, 1);
        }
        return result;
    }
}

export default SeedConsumer;
