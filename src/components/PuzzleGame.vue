<template>
  <div class="puzzle">
      <div class="grid">
          <div v-for="(row, rowIndex) in grid.rows" :key="rowIndex" class="row">
              <div v-for="(cell, columnIndex) in row" :key="columnIndex + (rowIndex * grid.size)" class="cell">
                  <span>&nbsp;</span>
                  <span v-if="showSolution">{{ cell }}</span>
                  <div v-if="rowIndex + 1 < grid.size"
                       :class="getBottomDotColor(rowIndex, columnIndex)"
                       class="dot bottom"></div>
                  <div v-if="columnIndex + 1 < grid.size"
                       :class="getRightDotColor(rowIndex, columnIndex)"
                       class="dot right"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import generateGrid from '@/puzzle/generator';

export default {
    props: {
        seed: {
            type: Number,
            required: true,
        },
        showSolution: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        grid(){
            return generateGrid(this.seed);
        }
    },
    methods: {
        getBottomDotColor(rowIndex, columnIndex) {
            const myNumber = this.grid.rows[rowIndex][columnIndex];
            const otherNumber = this.grid.rows[rowIndex + 1][columnIndex];
            return this.getDotColor(myNumber, otherNumber);
        },
        getRightDotColor(rowIndex, columnIndex) {
            const myNumber = this.grid.rows[rowIndex][columnIndex];
            const otherNumber = this.grid.rows[rowIndex][columnIndex + 1];
            return this.getDotColor(myNumber, otherNumber);
        },
        getDotColor(number1, number2) {
            if (number1 === number2 * 2 || number1 * 2 === number2) {
                return 'black';
            }
            if (number1 === number2 + 1 || number1 + 1 === number2) {
                return 'white';
            }
            return null;
        },
    },
}
</script>

<style scoped>
.cell {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 75px;
    height: 75px;
    font-size: 16pt;
    font-family: Arial, Helvetica, sans-serif;
    background: #EEEEEE;
    margin: 1px;
}
.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;

    position: absolute;
    z-index: 1000;
    display: none;
}
.bottom {
    bottom: -6px;
}
.right {
    right: -6px;
}
.black {
    display: block;
    background: black;
}
.white {
    display: block;
    background: white;
    border: 1px solid black;
}
</style>
