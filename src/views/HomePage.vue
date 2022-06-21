<template>
    <div class="home-wrapper center">
        <section class="user-info" v-if="user">
            <img :src="user.imgUrl" alt="">
            <h3>Hello, {{ user.name }}</h3>
            <h4>Coins: {{ user.coins }}</h4>
            <h4>BTC: {{ btcRate }}</h4>
        </section>
        <h2 class="move-title">Your move<span v-if="user.moves.length > 1">s</span>, {{ user.moves.length }} in total
        </h2>
        <MoveList :user="user" />
    </div>
</template>

<script>
import MoveList from '@/components/MoveList.vue'
import { bitcoinService } from '@/services/bitcoin.service'
export default {
    data() {
        return {
            btcRate: 0
        }
    },
    async created() {
        if (!this.user) await this.$store.dispatch({ type: 'loadUser' })
        const rate = await bitcoinService.getRate()
        this.btcRate = rate
    },
    computed: {
        user() { return this.$store.getters.user }
    },
    components: {
        MoveList
    }
}
</script>