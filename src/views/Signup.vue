<template>
    <form @submit.prevent="(ev) => onSubmit(ev)" class="signup-form center">
        <h3>Sign up</h3>
        <input type="text" name="name" v-model="formData.name" placeholder="Name" autocomplete="off">
        <input type="password" name="password" v-model="formData.password" placeholder="Password" autocomplete="off">
        <button class="signup">Sign up</button>
        <hr>
        <RouterLink to="/Login">Login</RouterLink>
    </form>
</template>

<script>
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
export default {
    destroyed() {
        this.isSubmitting = false
    },
    data() {
        return {
            formData: {
                name: '',
                password: ''
            },
            isSubmitting: false
        }
    },
    methods: {
        async onSubmit() {
            this.isSubmitting = true
            try {
                const user = await authService.doRegister(this.formData)
                this.$store.dispatch({ type: 'setUser', user })
                console.log(this.$store.getters.user)
                this.$router.push('/')
            } catch (error) {
                console.error('onSubmit - error', error)
                const errorCode = 'auth/email-already-in-use'
                if (error.code = errorCode) {
                    console.log('Name already taken')
                }
            } finally {
                this.isSubmitting = false
            }
        }
    }
}
</script>

