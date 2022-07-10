<template>
    <form @submit.prevent="(ev) => onSubmit(ev)" class="auth-form center">
        <h3>Log in</h3>
        <input type="text" name="name" v-model="formData.name" placeholder="Name" autocomplete="off">
        <input type="password" name="password" v-model="formData.password" placeholder="Password" autocomplete="off">
        <button class="signup">Log in</button>
        <hr>
        <RouterLink class="switch" to="/Signup">Sign up</RouterLink>
    </form>
</template>

<script>
export default {
    props: {
        cb: {
            type: Function,
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
            this.cb(this.formData)
        }
    }
}
</script>