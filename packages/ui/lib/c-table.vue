<template>
  <table>
    <thead class="heading" colspan="4">
      <tr>
        <th v-for="heading in headings" :key="heading">{{ capitalizeHeading(heading) }}</th>
        <th v-if="hasControlsSlot"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="item + '-' + index">
        <td v-for="(heading, index) in headings" :key="item + '-' + heading + '-' + index">
          {{ item[heading] }}
        </td>
        <td>
          <slot name="controls" :item="item" :index="index"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'c-icon',
  props: {
    headings: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    hasControlsSlot() {
      return this.$scopedSlots.controls
    }
  },
  methods: {
    capitalizeHeading(heading) {
      return heading.charAt(0).toUpperCase() + heading.slice(1)
    }
  }
}
</script>

<style lang="postcss" scoped>
/* .heading {
  @apply bg-gray-100;
} */
</style>
