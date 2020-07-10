<template>
  <div class="admin">
    <Menu v-if="getAuth"></Menu>
    <div :class="{ content: getAuth, auth: !getAuth }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
  },
  computed: {
    ...mapGetters(['getAuth'])
  }
}
</script>

<style lang="postcss" scoped>
.admin {
  display: flex;
}
.auth {
  width: 100vw;
}
.content {
  width: 100vw;
  padding: 65px 15px 15px;
}

@screen md {
  width: calc(100vw - 300px);
}
</style>
