<template>
  <button :type="type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'c-button',
  props: {
    value: String,
    type: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<style></style>
