<template>
  <div class="admin">
    <Menu class="menu"></Menu>
    <div class="content">
      <h1>Hello There!</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from "./components/Menu";
export default {
  name: 'Admin',
  components: {
    Menu
  }
}
</script>

<style scoped>

.admin {
  display: flex;
}
.menu {
  width: 300px;
}
.content {
  padding: 65px 15px 15px;
}

</style>
