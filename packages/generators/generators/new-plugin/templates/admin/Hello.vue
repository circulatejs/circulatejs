<template>
  <div class="hello">
    <p>hello world</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Hello',
  computed: {
    ...mapGetters(['getMenuItems'])
  },
  methods: {
    ...mapMutations(['addMenuItem'])
  },
  mounted() {
    //   this.addMenuItem({
    //       name: 'Test',
    //       path: '/test'
    //   })
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
