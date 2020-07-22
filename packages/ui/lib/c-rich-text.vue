<template>
  <div class="rich-text" ref="richText"></div>
</template>

<script>
import Quill from 'quill'
import '../../../node_modules/quill/dist/quill.snow.css'

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
