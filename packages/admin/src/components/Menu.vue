<template>
    <div class="menu" v-if="showMenu">
        <div class="upper-menu">
            <button type="button" class="menu-button" @click="setMobileMenu">
                Menu
            </button>
            <button type="button" @click="logout">
                Logout
            </button>
        </div>
        <nav class="left-menu menu-link__wrap bg-c-blue" :class="{ 'mobile-open': mobileMenuActive }">
            <div class="logo__wrap">
                <img class="logo" src="../assets/img/circulatejs-logo-white.svg" alt="CirculateJS Admin Logo" />
            </div>
            <router-link v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.path">
                {{ menuItem.menu }}
            </router-link>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      menuItems: [],
      mobileMenuActive: false
    }
  },
  computed: {
    showMenu () {
      if (this.$route.path === '/login') {
        return false
      }
      return true
    }
  },
  mounted () {
    this.$router.options.routes.forEach(route => {
      this.menuItems.push(route)
    })
  },
  methods: {
    setMobileMenu () {
      this.mobileMenuActive = !this.mobileMenuActive
    },
    logout () {
      const Token = localStorage.getItem('Token') || null

      if (Token) {
        this.$store.commit('setAuth', false)
        localStorage.removeItem('Token')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.menu a {
    font-size: 1.2em;
    color: white;
}
.left-menu {
    display: none;
    flex-direction: column;
    position: fixed;
    width: 300px;
    height: 100vh;
    padding: 15px;
    color: white;
}
.logo__wrap {
    padding: 0 30px 30px;
    text-align: center;
}
.upper-menu {
    position: fixed;
    display: inline-flex;
    top: 0;
    height: 55px;
    width: 100%;
    background: white;
    border-bottom: 1px solid #ccc;
}
.menu-button {
    height: 30px;
    width: 30px;
}
.mobile-open {
    display: flex;
}

@screen md {
    .upper-menu {
        left: 300px;
    }
    .left-menu {
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .menu-button {
        display: none;
    }
}
</style>
