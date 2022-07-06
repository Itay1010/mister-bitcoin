<template>
    <AppHeader />
    <div class="contact-details full">
        <div class="details-container">
            <img class="contact-img" :src="contact.imgUrl" alt="">
            <h2>Name: {{ contact.name }}</h2>
            <h2>Phone: {{ contact.phone }}</h2>
            <h2>Email: {{ contact.email }}</h2>
            <section class="tools">
                <RouterLink to="/contact">Back</RouterLink>
                <RouterLink :to="`/contact/edit/${contact._id}`">Edit</RouterLink>
            </section>
        </div>
        <TransferFund :contact="contact" />
        <MoveList v-if="contact && userMoves" :moves="userMoves" :filterBy="filterBy" />
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import TransferFund from '@/components/TransferFund.vue'
import MoveList from '@/components/MoveList.vue'
import AppHeader from '@/components/AppHeader.vue'
export default {
    data() {
        return {
            contact: {},
            filterBy: {
                field: 'contact',
                nested: '_id',
                value: this.$route.params.id
            }
        }
    },
    async created() {
        if (!this.contacts) await this.loadContacts()
        const { id: contactId } = this.$route.params
        const contact = this.contacts.find(contact => contact._id === contactId)
        this.filterBy.value = contact._id
        this.contact = contact
    },
    methods: {
        async loadContacts() {
            await this.$store.dispatch({ type: 'loadContacts' })
        }
    },
    computed: {
        contacts() { return this.$store.getters.contacts },
        userMoves() { return this.$store.getters.user?.moves }
    },
    components: {
        RouterLink,
        TransferFund,
        MoveList,
        AppHeader
    }
}
</script>
