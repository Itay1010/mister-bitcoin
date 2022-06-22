<template>
    <div class="move-list">
        <MovePreview v-for="move in user.moves" :key="move.date" :move="move" />
    </div>
</template>

<script>
import MovePreview from './MovePreview.vue'

export default {
    props: {
        user: {
            type: Object,
        },
    },
    components: {
        MovePreview
    }
}
</script>

<style>
</style>