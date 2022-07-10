<template>
    <SignupForm :cb="onSubmit" v-show="!isSubmitting" />
    <h1 class="logo center">Mister.Bit(Coin)</h1>
    <!-- <img class="graphic" :src="graphic" alt=""> -->
    <!-- <img class="graphic-2" :src="graphic2" alt=""> -->
</template>

<script>
import { authService } from '@/services/auth.service'
import img from '@/assets/imgs/projections-graphic.svg'
import img2 from '@/assets/imgs/analytics-graphic.svg'
import SignupForm from '@/components/SignupForm.vue'

export default {
    data() {
        return {
            isSubmitting: false
        }
    },
    computed: {
        graphic() { return img },
        graphic2() { return img2 }
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
        SignupForm
    }
}
</script>

