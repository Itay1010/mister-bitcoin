<template>
    <div class="move-container">
        <h2 class="title" v-if="title">{{ title }}</h2>
        <div class="move-list" v-if="moves">
            <MovePreview v-for="move in movesForDisplay" :key="move.date" :move="move" />
        </div>
    </div>
</template>

<script>
import MovePreview from './MovePreview.vue'

export default {
    props: {
        moves: {
            type: Array
        },
        title: {
            type: String,
            default: 'Transactions'
        },
        filterBy: {
            type: Object
        }
    },
    computed: {
        movesForDisplay() {
            if(!this.moves) return null
            if (!this.filterBy) return this.moves
            return this.moves.filter(move => move[this.filterBy.field][this.filterBy.nested] === this.filterBy.value)
        }
    },
    components: {
        MovePreview
    }
}
</script>