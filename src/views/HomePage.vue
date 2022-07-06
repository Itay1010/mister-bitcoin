<template>
    <AppHeader />
    <div class="home-wrapper center">
        <section class="user-info" v-if="user">
            <img :src="user.imgUrl" alt="">
            <h3>Hello, {{ user.name }}</h3>
            <h4>Coins: {{ user.coins }}</h4>
            <h4>BTC: {{ btcRate }}</h4>
        </section>
        <div class="home-loader" v-else>
            <h2>Loading...</h2>
        </div>
        <div class="home-moves">
            <h2 class="move-title" v-if="user">
                Your transaction<span v-if="user.moves.length > 1">s</span>, {{ user.moves.length }} in total
            </h2>
            <MoveList v-if="user" :moves="user.moves" :title="''" />
        </div>
    </div>
</template>

<script>
import MoveList from '@/components/MoveList.vue'
import { bitcoinService } from '@/services/bitcoin.service'
import { firebaseService } from '@/services/firebase.service'
import AppHeader from '@/components/AppHeader.vue'

export default {
    data() {
        return {
            btcRate: 0,
        }
    },
    async created() {
        if (!this.user) {
            const user = await firebaseService.getUser()
            if (!user) return this.$router.push('/signup')
            this.$store.dispatch('loadUser', { id: user.uid })
        }
        const rate = await bitcoinService.getRate()
        this.btcRate = rate
    },
    computed: {
        user() { return this.$store.getters.user }
    },
    components: {
        MoveList,
        AppHeader
    }
}
</script>