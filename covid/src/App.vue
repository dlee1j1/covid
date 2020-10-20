<template>
  <form id="app" @submit.prevent="">
    <div v-if="!start">
    <Precheck @start="start=true"/>
    </div> 
    <div v-else> 
    <ComplicationRisk :debug="debug" @updated="updated($event)" @hook:mounted="childmounted('ComplicationRisk')" ref="ComplicationRisk"/>
    <InfectionRisk :debug="debug" @toggleDebug="toggleDebug" @updated="updated($event)" @hook:mounted="childmounted('InfectionRisk')" ref="InfectionRisk"/>
    <div style="float:right;" id="form"> 
        <button type="button" onclick="print()" >Print</button> 
        <button type="button" @click="share()" >Share</button> 
    </div>
    </div>
  </form>
</template>

<script>
import ComplicationRisk from "./components/ComplicationRisk.vue";
import InfectionRisk from "./components/InfectionRisk.vue";
import Precheck from "./components/Precheck.vue"

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwWNvUSiJiria3hew6MHD6bd3zVP_3WvpVIx0JXhHGHhLYzbAnw/exec";

let u = new URLSearchParams(window.location.search)
let debug = u.get("debug") != null;
console.log(`Debug = ${debug}`)

export default {
  name: "App",
  data() {
      return {
        hasmount:0,
        debug: debug,
        start: false
      }
  },
  methods: {
    toggleDebug: function () {
      this.debug = !this.debug;
    },
    share() {
      var dict = {};
      this.$refs.ComplicationRisk.flatten(dict)
      this.$refs.InfectionRisk.flatten(dict)
      let data = new FormData();
      let key
      for (key in dict) {
        data.append(key, dict[key]);
      }
      var st = JSON.stringify(dict);
      console.log(st);
      if (
        confirm(
          "You are about to share this data for our research. Please confirm"
        )
      ) {
        fetch(scriptURL, {
          method: "POST",
          body: data,
        })
          .then((response) => { alert("Successfully shared."); console.log(`Response: ${response}`) })
          .catch((error) =>
            alert(
              "Error!" +
                error.message +
                " Data was not shared. Please try again later."
            )
          );
      } else {
        alert("Aborted. Data was not shared.");
      }
    },
    updated(component) {
         if (this.hasmount >= 2) component.save("auto");
    },
    childmounted(name) {
      this.$refs[name].load("auto")
      this.hasmount++
    }
  },
  // mounted() {   
  //       this.$refs.ComplicationRisk.load("auto")
  //       this.$refs.InfectionRisk.load("auto")
  //       this.hasmount = true
  //  },
  components: {
    ComplicationRisk,
    InfectionRisk,
    Precheck
  },
};
</script>


<style>
table html body {
  max-height: 999999px;
  font-family: serif;
  font-size: calc(1rem + 1vw);
}

@media (min-width: 30em) {
  html {
    font-size: 90%;
  }
  div.footnote {
    font-size: 90%;
  }
}

table {
  border: 1px solid #1c6ea4;
  background-color: #eeeeee;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

table td,
table th {
  border: 1px solid #aaaaaa;
  padding: 2px 3px;
  padding-left: 5px;
  vertical-align: top;
}

table  td {
  max-height: 999999px;
}

table  td.bold {
  font-weight: bold;
}

table td input:read-only {
  border: 0px;
  background-color: yellow;
}

table td input {
  width: 20vw;
  max-width: 20vw;
  height: 110%;
  text-align: right;
  font-size: 1rem;
}

table td select {
  width: 20vw;
  height: 110%;
  max-width: 20vw;
  font-size: 1rem;
}

table tr:nth-child(even) {
  background: #d0e4f5;
}

table thead {
  background: #1c6ea4;
  background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  background: -webkit-linear-gradient(
    top,
    #5592bb 0%,
    #327cad 66%,
    #1c6ea4 100%
  );
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  border-bottom: 2px solid #444444;
}

table thead th {
  font-size: 0.9em;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  border-left: 2px solid #d0e4f5;
}

table thead th:first-child {
  border-left: none;
}

table.purpleTable tr:nth-child(even) {
  background: #f3d4f5;
}

table.purpleTable thead {
  background: #a220a4;
  background: -moz-linear-gradient(top, #b958bb 0%, #ab36ad 66%, #a220a4 100%);
  background: -webkit-linear-gradient(
    top,
    #b958bb 0%,
    #ab36ad 66%,
    #a220a4 100%
  );
  background: linear-gradient(to bottom, #b958bb 0%, #ab36ad 66%, #a220a4 100%);
}


@media print {
  button,
  :placeholder-shown,
  .debug,
  .more {
    display: none;
  }
}
</style>
