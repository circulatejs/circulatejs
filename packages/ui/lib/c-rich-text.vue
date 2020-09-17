<template>
  <div class="input-container">
    <div class="rich-text" ref="richText"></div>
  </div>
</template>

<script>
import Quill from 'quill'

export default {
  name: 'c-rich-text',
  props: {},
  data() {
    return {
      quill: null
    }
  },
  mounted() {
    const $this = this
    this.initQuill()
    this.quill.on('text-change', () => {
      const contents = $this.quill.getContents()
      $this.$emit('input', JSON.stringify(contents))
    })
  },
  methods: {
    initQuill() {
      this.quill = new Quill(this.$refs.richText, {
        theme: 'snow'
      })
    }
  },
  watch: {
    '$attrs.value': {
      handler(val) {
        if (val === '') {
          const length = this.quill.getLength()
          this.quill.deleteText(0, length)
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.rich-text {
  max-height: 350px;
  font-size: 14px;
}
.input-container {
  position: relative;
  margin-bottom: 1em;
  padding-top: 10px;
}
</style>
