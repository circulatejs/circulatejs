<template>
    <input @input="$emit('input', $event.target.value)" class="input" :type="type" :placeholder="placeholder" />
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
  }
}
</script>

<style lang="postcss" scoped>
    .input {
        border: 1px solid green;
    }
</style>
