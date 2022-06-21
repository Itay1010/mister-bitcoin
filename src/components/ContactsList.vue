<template>
    <div class="contact-list">
        <ContactPreview v-for="contact in contacts" :contact="contact" :key="contact._id"
        @delete="id => $emit('delete', id)"
        />
        <button class="add-btn" @click="$router.push('/contact/edit')">+Add</button>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import ContactPreview from './ContactPreview.vue'

export default {
    props: {
        contacts: {
            type: Array,
            required: true,
        }
    },
    components: {
        RouterLink,
        ContactPreview
    }

}
</script>