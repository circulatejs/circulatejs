<template>
  <div class="user-menu relative">
    <c-button @click.native="openMenu" class="user-icon">
      <template>
        <c-icon :height="32" :width="32" name="user" class="user-icon-img"></c-icon>
      </template>
    </c-button>
    <transition name="menu">
      <nav v-show="menu" class="right-nav absolute">
        <button type="button" class="bg-transparent text-black">
          Settings
        </button>
        <button type="button" class="bg-transparent text-black" @click="logout">
          Logout
        </button>
      </nav>
    </transition>
  </div>
</template>

<script>
import { cButton, cIcon } from '@circulatejs/ui'

export default {
  name: 'Dashboard',
  data() {
    return {
      menu: false
    }
  },
  components: {
    cButton,
    cIcon
  },
  methods: {
    openMenu() {
      this.menu = !this.menu
    },
    logout() {
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
.user-icon {
  @apply bg-gray-500;
  height: 45px;
  width: 45px;
  border-radius: 45px;
}
.user-icon-img {
  position: absolute;
  top: 6px;
  left: 7px;
}
.right-nav {
  @apply py-4 px-8 bg-white shadow-lg;
  right: 0;
}

/* Transitions */
.menu-enter-active,
.menu-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.menu-enter,
.menu-leave-to {
  transform: translatey(-15px);
  opacity: 0;
}
</style>
