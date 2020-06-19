<template>
  <div class="app">
    <Menu v-if="getAuth"></Menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from './components/Menu.vue';

export default {
  name: 'App',
  components: {
    Menu
  },
  computed: {
    ...mapGetters([
      'getAuth'
    ])
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
