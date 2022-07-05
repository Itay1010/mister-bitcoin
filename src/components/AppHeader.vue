<template>
    <div class="header-container full">
        <header class="app-header">
            <router-link to="/">
                <h3 class="title">MisterBit(coin)</h3>
            </router-link>
            <nav class="app-nav">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/contact">Contacts</RouterLink>
                <RouterLink to="/statistics">Statistics</RouterLink>
            </nav>
        </header>
    </div>
</template>

<script>
export default {
    created() {
        if (!this.$store.getters.user) this.$store.dispatch({ type: 'loadUser' })
    }
}

</script>