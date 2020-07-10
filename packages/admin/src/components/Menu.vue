<template>
  <div class="menu" v-if="showMenu">
    <div class="upper-menu">
      <div class="left-side">
        <c-button
          type="button"
          class="menu-button bg-transparent text-black p-0"
          @click.native="setMobileMenu"
        >
          <template>
            <c-icon name="menu" class="inline"></c-icon>
          </template>
        </c-button>
      </div>
      <div class="right-side">
        <user-menu></user-menu>
      </div>
    </div>
    <transition name="slide-in">
      <nav
        v-show="menuActive"
        class="left-menu menu-link__wrap bg-c-blue shadow-menu md:shadow-none"
      >
        <c-button
          type="button"
          class="absolute menu-button-close bg-transparent text-black p-0 md:hidden"
          @click.native="setMobileMenu"
        >
          <template>
            <c-icon name="x" class="inline"></c-icon>
          </template>
        </c-button>
        <div class="logo__wrap">
          <img
            class="logo"
            src="../assets/img/circulatejs-logo-white.svg"
            alt="CirculateJS Admin Logo"
          />
        </div>
        <menu-link menu="Dashboard" path="/" icon="layout-2"></menu-link>
        <menu-link menu="Users" path="/users" icon="user"></menu-link>
        <div class="p-4"></div>
        <menu-link
          v-for="(menuItem, index) in menuItems"
          :key="menuItem.menu + '-' + index"
          :menu="menuItem.menu"
          :path="menuItem.path"
        ></menu-link>
      </nav>
    </transition>
  </div>
</template>

<script>
// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from `${__dirname}/tailwind.config.js`
import UserMenu from './UserMenu.vue'
import MenuLink from './MenuLink.vue'
import { cButton, cIcon } from '@circulatejs/ui'

export default {
  name: 'Menu',
  components: {
    UserMenu,
    MenuLink,
    cButton,
    cIcon
  },
  data() {
    return {
      menuItems: [],
      menuActive: true
    }
  },
  computed: {
    showMenu() {
      if (this.$route.path === '/login') {
        return false
      }
      return true
    }
  },
  beforeMount() {
    // eslint-disable-next-line
    const md = SCREEN_SIZES.md
    const mm = window.matchMedia(`(min-width: ${md})`)

    if (!mm.matches) {
      this.menuActive = false
    }
    mm.addListener(this.menuListener)
  },
  mounted() {
    this.$router.options.routes.forEach((route) => {
      if (route.menu) {
        this.menuItems.push(route)
      }
    })
  },
  methods: {
    setMobileMenu() {
      this.menuActive = !this.menuActive
    },
    menuListener(e) {
      if (e.matches) {
        this.menuActive = true
      } else {
        this.menuActive = false
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
  display: flex;
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
  padding: 5px;
  width: 100%;
  background: white;
  border-bottom: 1px solid #ccc;
}
.left-side {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
}
.right-side {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
}
.menu-button {
  height: 30px;
  width: 30px;
}
.mobile-open {
  display: flex;
}
.menu-button-close {
  right: -30px;
}

/* Transitions */
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.2s, opacity 0.15s ease-in-out;
}
.slide-in-enter,
.slide-in-leave-to {
  transform: translateX(-300px);
  opacity: 0;
}

@screen md {
  .upper-menu {
    padding-left: 300px;
  }
  .left-menu {
    display: flex;
    position: relative;
  }
  .menu-button {
    display: none;
  }
}
</style>
