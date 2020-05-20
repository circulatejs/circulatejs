<template>
    <div class="menu">
        <div class="upper-menu"></div>
        <div class="menu-link__wrap">
            <router-link v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.path">
                {{ menuItem.menu }}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
      return {
          menuItems: []
      }
  },
  mounted() {
      this.$router.options.routes.forEach(route => {
          this.menuItems.push(route)
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
