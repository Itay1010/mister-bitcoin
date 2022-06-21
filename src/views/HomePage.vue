<template>
    <div class="home-wrapper center">
        <section class="user-info">
            <img :src="user.imgUrl" alt="">
            <h3>hello {{ user.name }}</h3>
            <h4>Coins: {{ user.coins }}</h4>
            <h4>BTC: {{btcRate}}</h4>
        </section>
    </div>
</template>

<script>
import { userService } from '@/services/user.service'
import { bitcoinService } from '@/services/bitcoin.service'
export default {
    data() {
        return {
            user: null,
            btcRate: 0
        }
    },
    async created() {
        const user = userService.getUser()
        this.user = user
        const rate = await bitcoinService.getRate()
        this.btcRate = rate
    }
}
</script>