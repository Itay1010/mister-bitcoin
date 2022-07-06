<template>
    <main class="main-wrapper main-leyout">
        <UserMsg />
        <RouterView />
    </main>
</template>

<script lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import UserMsg from "./components/UserMsg.vue";

export default {
    components: {
        AppHeader,
        UserMsg
    }
}
</script>

<style lang="scss">
@import '@/assets/style';
</style>