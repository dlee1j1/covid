<template>
  <span :key="show" @click.stop="toggle">
    <a v-if="!show" class="more" v-html="morelink"></a>
    <a v-else-if="retain" class="more-text" v-html="morelink"></a>
    <span v-show="show" class="more-text"> <slot> </slot> </span>
  </span>
</template>

<script>
export default {
  props: ["teaser", "retain"],
  data() {
    return {
      show: false,
      morelink: this.teaser || "Learn more...",
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
a.more {
  color: red;
  text-decoration: underline;
  font-style: italic;
  font-size: smaller;
  cursor: pointer;
}

.more-text {
  font-style: italic;
  font-size: smaller;
  cursor: pointer;
}
</style>