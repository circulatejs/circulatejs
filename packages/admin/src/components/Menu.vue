<template>
    <div class="menu">
        <div class="upper-menu"></div>
        <div class="menu-link__wrap">
            <router-link v-for="(menuItem, index) in getMenuItems" :key="index" :to="menuItem.path">
                {{ menuItem.name }}
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Menu',
  computed: {
      ...mapGetters(['getMenuItems'])
  },
  methods: {
      ...mapMutations(['addMenuItem'])
  },
  mounted() {
      this.addMenuItem({
          name: 'Home',
          path: '/'
      })

      this.addMenuItem({
          name: 'Another',
          path: '/some-other'
      })
  }
}
</script>

<style scoped>
.menu {
    height: 100vh;
    padding: 70px 15px 15px;
    background: rgb(35, 97, 211);
    color: white;
}
.menu a {
    font-size: 1.2em;
    color: white;
}
.upper-menu {
    position: fixed;
    top: 0;
    left: 300px;
    height: 55px;
    width: 100%;
    background: white;
    border-bottom: 1px solid #ccc;
}
.menu-link__wrap {
    display: flex;
    flex-direction: column;
}
</style>
