<template>
    <div class="contact-details center">
        <img :src="contact.imgUrl" alt="">
        <h2>Name: {{ contact.name }}</h2>
        <h2>Phone: {{ contact.phone }}</h2>
        <h2>Email: {{ contact.email }}</h2>
        <section class="tools">
            <RouterLink to="/contact">Back</RouterLink>
            <RouterLink :to="`/contact/edit/${contact._id}`">Edit</RouterLink>
        </section>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
    data() {
        return {
            contact: {}
        }
    },
    async created() {
        if (!this.contacts.length) await this.loadContacts()
        const { id: contactId } = this.$route.params
        const contact = this.contacts.find(contact => contact._id === contactId)
        this.contact = contact
    },
    methods: {
        async loadContacts() {
            await this.$store.dispatch({ type: 'loadContacts' })
        }
    },
    computed: {
        contacts() { return this.$store.getters.contacts }
    },
    components: {
        RouterLink
    }
}
</script>
