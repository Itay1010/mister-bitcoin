<template>
    <AuthForm @auth="onSubmit($event)" :isLogin="false" v-show="!isSubmitting" />
    <h1 class="logo center">Mister.Bit(Coin)</h1>
</template>

<script>
import { authService } from '@/services/auth.service'
import AuthForm from '@/components/AuthForm.vue'

export default {
    data() {
        return {
            isSubmitting: false
        }
    },
    methods: {
        async onSubmit(formData) {
            this.isSubmitting = true
            try {
                const user = await authService.doRegister(formData)
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
    },
    components: {
        AuthForm
    }
}
</script>

