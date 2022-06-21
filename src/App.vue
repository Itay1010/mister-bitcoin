<template>
    <main class="main-wrapper main-leyout">
        <AppHeader />
        <RouterView />
    </main>
</template>

<script lang="ts">
import AppHeader from "@/components/AppHeader.vue";
export default {
    components: {
        AppHeader
    }
}
</script>

<style lang="scss">
@import '@/assets/style';
</style>