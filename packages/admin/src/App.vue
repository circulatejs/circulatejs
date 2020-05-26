<template>
  <div class="app">
    <Menu></Menu>
    <div class="content">
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
.content {
  padding: 65px 15px 15px;
}

</style>
