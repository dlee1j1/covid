<template>
  <span>
    <input placeholder="key (optional)" v-model="key" />
    <button @click="$parent.load(key)">Load</button>
    <button @click="$parent.save(key)">Save</button>
    <input
      v-model="state"
      :class="textclass"
      placeholder="enter state"
      @focus="expand()"
      @blur="shrink()"
    />
    <button @click="$parent.loadData(state)">Load Data</button>
    <a
      class="mailtoui"
      :href="
        'mailto:feedback@covidlink.risk?subject=debug&body=' + parentData()
      "
    >
      Email debug state</a
    >
    <input id="clipboard" 
        :value="stateString()" 
        :key="stateString()"
         @focus="copy($event.target)"

        class="hideme"/>
  </span>
</template>

<script>
export default {
  data() {
    return {
      key: null,
      textclass: "small",
      state: null
    };
  },
  methods: {
    parentData() {
      let data = this.stateString();
      let encoded = encodeURIComponent(data);
      if (encoded.length > 1000) {
        encoded = encodeURIComponent(
          "Please copy and paste the entire text box after the link into the email body"
        );
      }
      return encoded;
    },
    stateString() {
        return JSON.stringify(this.$parent.$data)
    },
    expand() {
      this.textclass = "large";
    },
    shrink() {
      this.textclass = "small";
    },
    copy(e) {
        e.select(); 
        e.setSelectionRange(0,99999);
        document.execCommand('copy')
    },
  },
};
</script>

<style scoped>
.small {
  width: auto;
}

.large {
  width: 300px;
}

.hideme {
    border-width: 0px;

}
</style>