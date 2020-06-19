<template>
    <div>
        <form @submit.prevent="submit">
            <input v-model="auth.username" type="text" placeholder="Username" />
            <input v-model="auth.password" type="password" placeholder="Password" />
            <button type="submit">
                Sign In
            </button>
        </form>
        <p>{{ error }}</p>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            auth: {
                username: '',
                password: ''
            },
            error: ''
        }
    },
    methods: {
        submit() {
            if (this.auth.username.length && this.auth.password.length) {
                this.$http.post('/admin/api/login', this.auth)
                .then(response => {
                    this.error = ''
                    if (response.data.auth) {
                        localStorage.setItem('Token', response.data.token);
                        this.$store.commit('setAuth', response.data.auth)
                        this.$router.push('/').catch((err) => {
                            throw new Error(`${err}`);
                        });
                    } else {
                        this.auth.password = ''
                        localStorage.removeItem('Token')
                        this.$store.commit('setAuth', response.data.auth)
                        this.error = response.data.text
                    }
                }).catch(error => {
                    localStorage.removeItem('Token')
                    console.error(error)
                })
            }
        }
    }
}
</script>
