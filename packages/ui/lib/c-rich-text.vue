<template>
  <div class="rich-text" ref="richText"></div>
</template>

<script>
import Quill from 'quill'

export default {
  name: 'c-rich-text',
  props: {},
  data() {
    return {}
  },
  mounted() {
    this.initQuill()
  },
  methods: {
    initQuill() {
      return new Quill(this.$refs.richText, {
        theme: 'snow'
      })
    }
  }
}
</script>
