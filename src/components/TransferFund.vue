<template>
    <div class="transfer full" v-if="!isSubmitting">
        <h1 class="main">Transfer funds to {{ contact.name }}</h1>
        <label for="amount">Amount:</label>
        <input id="amount" type="number" autocomplete="off" v-model="amount">
        <button class="transfer-btn" @click="submit">Transfer</button>
    </div>
    <div class="transfer loading full" v-if="isSubmitting">
    </div>
</template>

<script>
import { eventBus } from '@/services/eventBus.service'
export default {
    props: {
        contact: {
            type: Object,
        }
    },
    data() {
        return {
            amount: 0,
            isSubmitting: false,
        }
    },
    methods: {
        async submit() {
            if (this.amount <= 0) return
            this.isSubmitting = true
            try {
                const diff = -this.amount
                const move = { contact: { _id: this.contact._id, name: this.contact.name }, date: Date.now(), amount: this.amount }
                const prmUser = this.$store.dispatch({ type: 'updateUserFunds', payload: { diff, move } })
                const prmContact = this.$store.dispatch({ type: 'updateContactFunds', payload: { contactId: this.contact._id, diff: this.amount } })
                await Promise.all([prmUser, prmContact])
                alert(`funds transferred to ${this.contact.name}\n${this.$store.getters.user.coins} coins remaining`)
            } catch (error) {
                console.error(error)
            } finally {
                this.isSubmitting = false
            }
        }
    }

}
</script>