
<template>
    <div class="contact-edit center">
        <input type="text" v-model="contact.name" placeholder="Name">
        <input type="email" v-model="contact.email" placeholder="Email">
        <input type="text" v-model="contact.phone" placeholder="Phone number">
        <button class="submit" @click="onSave">Save</button>
    </div>
</template>

<script>
import { contactService } from '@/services/contact.service'
import { RouterLink } from 'vue-router'

export default {
    data() {
        return {
            contact: {}
        }
    },
    async created() {
        const { id: contactId } = this.$route.params
        if (!!contactId) {
            const contact = await contactService.getById(contactId)
            this.contact = JSON.parse(JSON.stringify(contact))
        } else {
            this.contact = this.empty
        }
        if (!this.$store.getters.contacts) this.loadContacts()
    },
    methods: {
        async loadContacts() {
            await this.$store.dispatch({ type: 'loadContacts' })
        },
        async onSave() {
            this.$store.dispatch({ type: 'saveContact', contact: this.contact })
        }

    },
    computed: {
        empty() {
            return contactService.getEmptyContact()
        }
    },
    components: {
        RouterLink
    }
}
</script>

<style lang="scss">
button.submit {
    border: none;
    cursor: pointer;
}
</style>