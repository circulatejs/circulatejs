<template>
  <div class="admin">
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

<style lang="postcss" scoped>
.admin {
  @apply flex;
}
.content {
  padding: 65px 15px 15px;
  @apply w-full;
}

</style>
