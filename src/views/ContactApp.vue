<template>
    <div class="contact-wrapper center">
        <ContactsList v-if="contacts" :contacts="contacts" @delete="onDelete" />
    </div>
</template>

<script>
import ContactsList from '@/components/ContactsList.vue'
export default {
    created() {
        this.loadContacts()
    },
    methods: {
        async loadContacts() {
            this.$store.dispatch({ type: 'loadContacts' })
        },
        onDelete(contactId) {
            this.$store.dispatch({ type: 'removeContact', contactId })
        }
    },
    computed: {
        contacts() {
            return this.$store.getters.contacts
        }
    },
    components: {
        ContactsList,
    }
}
</script>

<style>
</style>