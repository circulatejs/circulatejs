<template>
  <div v-show="!pending" class="flex justify-center">
    <div class="flex flex-col p-4 mt-16 bg-white rounded-lg shadow-lg sm:w-4/12 w-full">
      <form @submit.prevent="submit" class="flex flex-col">
        <c-input v-model.trim="auth.username" type="text" placeholder="Username"></c-input>
        <c-input v-model.trim="auth.password" type="password" placeholder="Password"></c-input>
        <button type="submit">
          Sign In
        </button>
      </form>
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { cInput } from '@circulatejs/components'

export default {
  name: 'Login',
  components: { cInput },
  data() {
    return {
      auth: {
        username: '',
        password: ''
      },
      pending: false,
      error: ''
    }
  },
  methods: {
    submit() {
      if (this.auth.username.length && this.auth.password.length) {
        this.$http
          .post('/admin/api/login', this.auth)
          .then((response) => {
            this.error = ''
            if (response.data.auth) {
              localStorage.setItem('Token', response.data.token)
              this.$store.commit('setAuth', response.data.auth)
              this.pending = true
              this.$router.push('/').catch((err) => {
                throw new Error(`${err}`)
              })
            } else {
              this.auth.password = ''
              localStorage.removeItem('Token')
              this.pending = false
              this.$store.commit('setAuth', response.data.auth)
              this.error = response.data.text
            }
          })
          .catch((error) => {
            localStorage.removeItem('Token')
            this.pending = false
            console.error(error)
          })
      }
    }
  }
}
</script>
