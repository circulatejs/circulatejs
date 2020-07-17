<template>
  <div class="input-container">
    <label class="placeholder" :class="{ label: label }">{{ placeholder }}</label>
    <input
      ref="input"
      @focus="setLabel"
      @blur="unsetLabel"
      @input="$emit('input', $event.target.value)"
      class="input"
      :type="type"
      :value="value"
    />
  </div>
</template>

<script>
export default {
  name: 'c-input',
  props: {
    value: String,
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      label: false
    }
  },
  methods: {
    setLabel() {
      this.label = true
    },
    unsetLabel() {
      if (this.$refs.input.value.length <= 0) {
        this.label = false
      }
    }
  },
  watch: {
    value(val) {
      if (val.length > 0) {
        this.label = true
      } else {
        this.setLabel()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.placeholder {
  @apply px-3 py-2;
  position: absolute;
  color: black;
  transition: all 0.2s ease-in-out;
  top: 10px;
  left: 0;
  pointer-events: none;
}
.label {
  @apply px-3 py-2 text-gray-600;
  font-size: 80%;
  top: -15px;
  left: -5px;
  pointer-events: auto;
}
.input-container {
  position: relative;
  margin-bottom: 1em;
  padding-top: 10px;
}
.input {
  border: 1px solid transparent;
  @apply bg-gray-200 shadow w-full;
}
.input:focus {
  border: 1px solid;
  @apply border-gray-500 bg-white;
  transition: all 0.2s ease-in-out;
  outline: none;
}
</style>
