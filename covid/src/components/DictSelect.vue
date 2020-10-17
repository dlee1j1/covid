<template>
  <select
    @input="$emit('input', [$event.target.value, dict[$event.target.value]])"
    :value="value ? value[0] : null"
  >
    <option selected="true" disabled="true"></option>
    <option v-for="(val, key) in dict" :key="key">{{ key }}</option>
  </select>
</template>

<script>
export default {
  props: ["value", "dict"],
};
</script>