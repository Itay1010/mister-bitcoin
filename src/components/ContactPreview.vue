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
import { Transition } from 'vue'


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
.fade-enter-active {
    transition: all 0.3s ease;
}

.fade-leave-active {
    transition: all 0.1s ease;
}


.fade-enter-from {
    opacity: 0;
    pointer-events: none;
    transform: rotateX(50deg);
}

.fade-leave-to {
    opacity: 0;
    pointer-events: all;
    transform: rotateX(0deg);
}
</style>