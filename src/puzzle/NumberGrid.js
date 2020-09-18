class NumberGrid {

    constructor(size) {
        this.size = size;
        this.rows = new Array(size);

        for (let y = 0; y < size; y++) {
            this.rows[y] = new Array(size);
            for (let x = 0; x < size; x++) {
                this.rows[y][x] = ((x + y) % size) + 1;
            }
        }
    }

    swapRows(rowIndex1, rowIndex2) {
        if (rowIndex1 < 0 || rowIndex2 < 0 || rowIndex1 >= this.size || rowIndex2 >= this.size) {
            throw new Error('Invalid arguments');
        }
        if (rowIndex1 === rowIndex2) {
            return;
        }
        const oldRow = this.rows[rowIndex1];
        this.rows[rowIndex1] = this.rows[rowIndex2];
        this.rows[rowIndex2] = oldRow;
    }

    swapColumns(columnIndex1, columnIndex2) {
        if (columnIndex1 < 0 || columnIndex2 < 0 || columnIndex1 >= this.size || columnIndex2 >= this.size) {
            throw new Error('Invalid arguments');
        }
        if (columnIndex1 === columnIndex2) {
            return;
        }
        for (let y = 0; y < this.size; y++) {
            const oldCell = this.rows[y][columnIndex1];
            this.rows[y][columnIndex1] = this.rows[y][columnIndex2];
            this.rows[y][columnIndex2] = oldCell;
        }
    }

    permuteRows(indexPermutation) {
        if (indexPermutation.length !== this.size) {
            throw new Error('Invalid arguments');
        }
        // TODO: Verify that permutation array is valid

        const oldRows = new Array(this.size);
        for (let y = 0; y < this.size; y++) {
            oldRows[y] = this.rows[y];
        }
        for (let y = 0; y < this.size; y++) {
            this.rows[y] = oldRows[indexPermutation[y]];
        }
    }

    permuteColumns(indexPermutation) {
        this.invert();
        this.permuteRows(indexPermutation);
        this.invert();
    }

    shiftRows(shift) {
        shift = shift % this.size;
        if (shift === 0) {
            return;
        }
        for (let i = 0; i < shift; i++) {
            this.rows.unshift(this.rows.pop());
        }
    }

    shiftColumns(shift) {
        shift = shift % this.size;
        if (shift === 0) {
            return;
        }
        for (let y = 0; y < this.size; y++) {
            for (let i = 0; i < shift; i++) {
                this.rows[y].unshift(this.rows[y].pop());
            }
        }
    }

    mirrorHorizontally() {
        for (let x = 0; x < Math.floor(this.size / 2); x++) {
            this.swapColumns(x, this.size - x - 1);
        }
    }

    mirrorVertically() {
        for (let y = 0; y < Math.floor(this.size / 2); y++) {
            this.swapRows(y, this.size - y - 1);
        }
    }

    invert() {
        for (let y = 0; y < this.size; y++) {
            for (let x = y + 1; x < this.size; x++) {
                const oldCell = this.rows[y][x];
                this.rows[y][x] = this.rows[x][y];
                this.rows[x][y] = oldCell;
            }
        }
    }

}

export default NumberGrid;
