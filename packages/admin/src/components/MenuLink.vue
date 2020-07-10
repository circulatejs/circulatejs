<template>
  <router-link class="inline-flex" :to="path">
    <c-icon :name="icon" class="menu-icon relative"></c-icon>
    <span class="ml-1">
      {{ menu }}
    </span>
  </router-link>
</template>

<script>
import { cIcon } from '@circulatejs/ui'

export default {
  name: 'c-input',
  components: {
    cIcon
  },
  props: {
    menu: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'square'
    }
  }
}
</script>

<style lang="postcss" scoped>
.menu-icon {
  top: 3px;
}
</style>
