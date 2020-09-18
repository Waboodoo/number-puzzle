<template>
    <div id="app">
        <PuzzleGame v-if="isValidSeed" :seed="seed" :showSolution="false" />
        <span v-else>Invalid seed</span>
    </div>
</template>

<script>
import PuzzleGame from './components/PuzzleGame.vue'
import { isValidSeed } from '@/puzzle/generator';

export default {
    components: {
        PuzzleGame,
    },
    data() {
        return {
            seed: Math.floor(Math.random() * 13547520) // TODO: Take from URL;
        };
    },
    computed: {
        isValidSeed() {
            return isValidSeed(this.seed);
        },
    },
}
</script>
