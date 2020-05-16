<template>
  <div class="app">
    <Menu class="menu"></Menu>
    <div class="content">
      <h1>Hello There!</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>

<style scoped>

.app {
  display: flex;
}
.menu {
  width: 300px;
}
.content {
  padding: 65px 15px 15px;
}

</style>
