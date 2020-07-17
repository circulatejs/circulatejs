<template>
  <div class="users">
    <h1>Users</h1>
    <div class="controls">
      <c-button @click.native="addUser">Add User</c-button>
    </div>
    <c-table v-if="!error" :headings="userHeaders" :items="users">
      <template v-slot:controls="slotProps" :user="user">
        <c-button @click.native="editUser(slotProps.item.id)" class="p-1 mr-1">
          <c-icon name="edit"></c-icon>
        </c-button>
        <c-button @click.native="removeUser(slotProps.item.id)" class="p-1">
          <c-icon name="trash"></c-icon>
        </c-button>
      </template>
    </c-table>
    <p v-if="error" class="error">There was an error loading users</p>
  </div>
</template>

<script>
import { cTable, cButton, cIcon } from '@circulatejs/ui'
export default {
  name: 'Users',
  components: {
    cTable,
    cButton,
    cIcon
  },
  data() {
    return {
      users: [],
      userHeaders: ['id', 'name', 'email'],
      error: false
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.error = false
      this.$http
        .get('/admin/api/users')
        .then((response) => {
          this.users = response.data.users
        })
        .catch((error) => {
          console.error(error)
          this.error = true
        })
    },
    addUser() {
      this.$router.push(`/users/add`)
    },
    editUser(id) {
      this.$router.push(`/users/${id}`)
    },
    removeUser(id) {
      this.$http
        .delete(`/admin/api/user/remove/${id}`)
        .then((response) => {
          this.getUsers()
        })
        .catch((error) => {
          console.error(error)
          this.error = true
        })
    }
  }
}
</script>

<style lang="postcss" scoped></style>
