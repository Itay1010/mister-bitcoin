<template>
    <LoginForm :cb="onSubmit" />
    <h1 class="logo center">Mister.Bit(Coin)</h1>
</template>

<script>
import { authService } from "@/services/auth.service";
import LoginForm from "../components/LoginForm.vue";
export default {
    data() {
        return {
            isSubmitting: false
        }
    },
    components: {
        LoginForm
    },
    methods: {
        async onSubmit(formData) {
            try {
                this.isSubmitting = true
                const user = await authService.login(formData)
                this.$store.dispatch({ type: 'setUser', user })
                this.$router.push('/')
            } catch (error) {
                console.error(error)
            } finally {
                this.isSubmitting = false
            }
        }
    }
}
</script>