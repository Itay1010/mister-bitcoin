
<template>
    <AppHeader />
    <div class="edit-wrapper center">
        <form class="contact-edit" @submit.prevent="onSave">
            <section class="form-section">
                <label for="name">Name</label>
                <input id="name" type="text" v-model="contact.name" placeholder="Name">
            </section>
            <section class="form-section">
                <label for="email">Email</label>
                <input id="email" type="email" v-model="contact.email" placeholder="Email">
            </section>
            <section class="form-section">
                <label for="pnum">Phone</label>
                <input id="pnum" type="text" v-model="contact.phone" placeholder="Phone number">
            </section>
            <section class="form-tools">
                <button class="submit btn">Save</button>
                <RouterLink class="btn" v-if="contact._id" :to="`/contact/${contact._id}`">Back</RouterLink>
                <RouterLink class="btn" v-else to="/contact/">Back</RouterLink>
            </section>

        </form>
    </div>
</template>

<script>
import { contactService } from '@/services/contact.service'
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
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
            this.$router.push('/contact')
        }

    },
    computed: {
        empty() {
            return contactService.getEmptyContact()
        }
    },
    components: {
        RouterLink,
        AppHeader
    }
}
</script>