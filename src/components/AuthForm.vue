<template>
    <form @submit.prevent="onSubmit($event)" class="auth-form center">
        <h3>{{ isLogin ? 'Log in' : 'Sign up' }}</h3>
        <input type="text" name="name" v-model="formData.name" placeholder="Name" autocomplete="off">
        <input type="password" name="password" v-model="formData.password" placeholder="Password" autocomplete="off">
        <button class="signup">{{ isLogin ? 'Log in' : 'Sign up' }}</button>
        <hr>
        <RouterLink class="switch" to="login" v-if="!isLogin">Log in</RouterLink>
        <RouterLink class="switch" to="signup" v-else>Sign up</RouterLink>
        <a class="login-guest" @click="onGuest('guest')">Try as Guest</a>
    </form>
</template>

<script>
import { authService } from '@/services/auth.service'

export default {
    emits: ['auth', 'guest'],
    props: {
        isLogin: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            formData: {
                name: '',
                password: ''
            },
        }
    },
    methods: {
        onSubmit() {
            this.$emit('auth', this.formData)
        },
        async onGuest() {
            const guest = await authService.loginGuest()
            this.$store.dispatch({type: 'setUser', user: guest})
            this.$router.push('/')
        }
    }
}
</script>