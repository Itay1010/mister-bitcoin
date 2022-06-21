<template>
    <RouterLink :to="`/contact/${contact._id}`" class="contacts-preview" @mouseenter="isBtnShow = true"
        @mouseleave="isBtnShow = false">
        <img :src="contact.imgUrl" alt="">
        <h3>{{ contact.name }}</h3>
        <Transition name="fade">
            <button class="delete" v-if="isBtnShow" @click.prevent="onDelete(contact._id)">X</button>
        </Transition>
    </RouterLink>
</template>

<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            isBtnShow: false,
        }
    },
    methods: {
        onDelete(contactId) {
            this.$emit('delete', contactId)
        }
    },
    components: {
    }
}
</script>

<style>
.contacts-preview {}

.fade-enter-active {
    transition: all 0.3s ease;
}

.fade-leave-active {
    transition: all 0.2s ease;
}

.fade-leave-to,
.fade-enter-from {
    opacity: 0;
    transform: rotate(90deg);
    pointer-events: none;
}
</style>