<template>
  <select v-if="value==null && placeholder"
    @input="$emit('input', [$event.target.value, dict[$event.target.value]])"
    :value="placeholder" 
    class="custom-select"
  >
    <option selected disabled :value="placeholder">{{placeholder}}</option>
    <option v-for="(val, key) in dict" :key="key">{{ key }}</option>
  </select>
  <select v-else
    @input="$emit('input', [$event.target.value, dict[$event.target.value]])"
    :value="value?value[0]:null"
    :key="value?value[0]:null"
   >
    <option selected disabled value></option>
    <option v-for="(val, key) in dict" :key="key">{{ key }}</option>
  </select>
</template>

<script>
export default {
  props: ["value", "dict","placeholder"],
  data() { 
    return {
      selected: (this.value?this.value[0]:(this.placeholder == undefined ? null : this.placeholder)),
    }
  }
};
</script>

<style scoped>
.custom-select {
  color:grey;
}

.custom-select:hover:focus {
  color:black;
}

</style>