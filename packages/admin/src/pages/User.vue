<template>
  <div class="users">
    <h1>User</h1>
    <form @submit.prevent="handleSubmit">
      <c-input v-model.trim="user.username" type="text" placeholder="Username"></c-input>
      <c-input v-model="user.name" type="text" placeholder="Name"></c-input>
      <c-input v-model.trim="user.email" type="email" placeholder="Email"></c-input>
      <c-input v-model="user.password" type="password" placeholder="Password"></c-input>
      <div class="inline-flex">
        <c-button type="submit" class="mr-2">
          <c-icon name="plus" class="inline"></c-icon>
          Add
        </c-button>
        <c-button class="remove">
          <c-icon name="trash" class="inline"></c-icon>
          Remove
        </c-button>
      </div>
      <p v-if="error" class="error">There was an error loading users</p>
    </form>
  </div>
</template>

<script>
import { cInput, cButton, cIcon } from '@circulatejs/ui'
export default {
  name: 'Users',
  components: {
    cInput,
    cButton,
    cIcon
  },
  data() {
    return {
      user: {
        username: '',
        name: '',
        email: '',
        password: ''
      },
      error: false
    }
  },
  mounted() {
    if (this.$route.meta.editUser) {
      this.getUser()
    }
  },
  methods: {
    getUser() {
      this.error = false
      this.$http
        .get(`/admin/api/user/${this.$route.params.id}`)
        .then((response) => {
          const user = response.data.user

          this.setUserData('username', user.username)
          this.setUserData('name', user.name)
          this.setUserData('email', user.email)
          this.user.password = '*****'
        })
        .catch((error) => {
          console.error(error)
          this.error = true
        })
    },
    handleSubmit() {
      this.$http
        .post('/admin/api/user/create', this.user)
        .then((response) => {
          this.$router.push('/users')
        })
        .catch((error) => {
          console.error(error)
          this.error = true
        })
    },
    setUserData(data, value) {
      this.user[data] = value
    }
  }
}
</script>

<style lang="postcss" scoped></style>
