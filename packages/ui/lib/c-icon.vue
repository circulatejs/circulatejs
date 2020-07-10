<template>
  <svg :width="width" :height="height">
    <use :xlink:href="'svg/tabler-sprite.svg#tabler-' + name" />
  </svg>
</template>

<script>
export default {
  name: 'c-icon',
  props: {
    name: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      required: false,
      default: 22
    },
    width: {
      type: Number,
      required: false,
      default: 22
    }
  }
}
</script>
