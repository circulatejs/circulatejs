<template>
    <div>
        <form @submit.prevent="submit">
            <input v-model="auth.username" type="text" placeholder="Username" />
            <input v-model="auth.password" type="password" placeholder="Username" />
            <button type="submit">
                Sign In
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            auth: {
                username: 'user',
                password: 'password'
            }
        }
    },
    methods: {
        submit() {
            this.$http.post('/admin/api/login', this.auth).then(response => {
                console.log(response)
                localStorage.setItem('Token', response.data.token);
                this.$router.push('/')
            }).catch(error => {
                console.log('major fail')
                console.error(error)
            })
        }
    }
}
</script>
