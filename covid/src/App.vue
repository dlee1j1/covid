<template>
  <form id="app" @submit.prevent="">
    <!---
    <div style="color:white;background:black;font-size:larger;text-align:center;margin=10px">
    This form currently in limited testing for friends and family. Please give us 
    <em> <a style="color:white"
      class="mailtoui" 
      :href="'mailto:feedback@covidrisk.link?subject=Feedback%20on%20covid%20assessment%20tool&body=Please%20tell%20us%3A%0AWhat%20did%20you%20find%20useful%3F%0AOr%20not%3F%C2%A0%C2%A0%0AAny%20part%20not%20clear%3F%C2%A0%0AAny%20suggestions%20for%20modification%3F'"> 
      feedback</a></em>. Please do <b>not</b> distribute widely yet.
    </div>
    --->

    <ComplicationRisk v-show="showComplication()" :debug="debug" @updated="updated($event)" @hook:mounted="childmounted('ComplicationRisk')" ref="ComplicationRisk">
      <template v-if="showWizard()" #next>
        <big-button @click="next()">
          Next: Evaluate Your Risk of Infection 
        </big-button>
      </template>
    </ComplicationRisk>
    
    <Precheck v-show="showPrecheck()">
      <template v-if="showWizard()"  #previous>
        <button @click="previous()" style="margin-top:5px"> 
          Back to Complications Risk
        </button>
      </template>
      <template v-if="showWizard()" #next>
        <big-button @click="next()">
          Continue 
        </big-button>
      </template>
    </Precheck>

    <InfectionRisk v-show="showInfection()" :debug="debug" @toggleDebug="toggleDebug" 
          @updated="updated($event)" 
          @riskrevealed="share()"
          @hook:mounted="childmounted('InfectionRisk')" ref="InfectionRisk">
      <template v-if="showWizard()" #previous>
        <button  @click="previous()"  style="margin-top:5px"> 
          Back to Complications Risk
        </button>
      </template>
      <template v-if="showWizard()" #next>
        <big-button @click="next()">
          Show Both Forms 
        </big-button>
      </template>

    </InfectionRisk>

    <div style="float:right;"> 
       <a class="mailtoui" 
          :href="'mailto:feedback@covidrisk.link?subject=Feedback%20on%20covid%20assessment%20tool&body=Please%20tell%20us%3A%0AWhat%20did%20you%20find%20useful%3F%0AOr%20not%3F%C2%A0%C2%A0%0AAny%20part%20not%20clear%3F%C2%A0%0AAny%20suggestions%20for%20modification%3F'"> 
        Send us feedback</a>
        <button type="button" @click="printme()" style="margin:5px">
          Print
        </button> 
    </div>
    <div style="margin:5px"> . </div>
  </form>
</template>

<script>
import ComplicationRisk from "./components/ComplicationRisk.vue";
import InfectionRisk from "./components/InfectionRisk.vue";
import Precheck from "./components/Precheck.vue"
import BigButton from "./components/BigButton.vue"

const MailtoUI = require("../node_modules/mailtoui/dist/mailtoui-min.js")

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwWNvUSiJiria3hew6MHD6bd3zVP_3WvpVIx0JXhHGHhLYzbAnw/exec";

let u = new URLSearchParams(window.location.search)
let debug = u.get("debug") != null;

/*
  wizard states = complication -> precheck -> infection -> open 
*/

export default {
  name: "App",
  data() {
      return {
        hasmount:0,
        debug: debug,
        wizard: "complication"
    }
  },
  created() {
    this.pressTimer = null
    this.cancelprint = false
  },
  methods: {
    // these methods walk the state of 'next' and 'previous' 
    next() {
      let state = this.wizard
      if (state == 'complication') { this.wizard ='precheck'}
      if (state == 'precheck') { this.wizard = 'infection'  }
      if (state == 'infection') { this.wizard = 'open'  }
    },
    previous() {
      let state = this.wizard
      if (state == 'precheck') { this.wizard = 'complication'  }
      if (state == 'infection') { this.wizard = 'complication'  }
    },

    pmousedown() {
      this.pressTimer = window.setTimeout(
        ()=> { this.debug = !this.debug; this.cancelprint = true }, 
        1000 
      )
      return false;
    },

    pmouseup() {
      clearTimeout(this.pressTimer);
      return false;
    },

    printme() {
      if (!this.cancelprint) {
        print();
      }      
      this.cancelprint = false;
    },

    showComplication() {
      return (this.wizard == 'complication') || (this.wizard == 'open')
    },

    showPrecheck() {
      return (this.wizard == 'precheck')
    },

    showInfection() {
      return (this.wizard == 'infection') || (this.wizard == 'open')
    },

    showWizard() {
      return (this.wizard != 'open')
    },

    toggleDebug() {
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
      // go ahead and post the data
      fetch(scriptURL, {
        method: "POST",
        body: data,
      })
        .then((response) => { console.log(`Response: ${response}`) })
        .catch((error) =>
          console.log(
            "Error!" +
              error.message))
    },
    updated(component) {
         if (this.hasmount >= 2) component.save("auto");
    },
    childmounted(name) {
      this.$refs[name].load("auto")
      this.hasmount++
    }
  },
  mounted() {
    MailtoUI.run(); 
  },
  components: {
    ComplicationRisk,
    InfectionRisk,
    Precheck,
    BigButton
  },
};
</script>


<style>

table {
  max-height: 999999px;
  font-size: calc(1rem);

  border: 1px solid #1c6ea4;
  background-color: #eeeeee;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

@media (min-width: 30em) {
  html {
    font-size: 90%;
  }
}


body {
  background-image: url("assets/social.jpg");
  background-repeat: repeat-y; 
  font-family:Verdana, Geneva, Tahoma, sans-serif;
}

form {
  background-color: rgba(255,255,255, 0.85); /* White w/opacity/see-through */
  padding: 5px;
}


@media screen and (max-width: 70em) and (min-device-width: 1024px){
  body {
    max-width: 60em;
    margin-left: 80px;
    margin-right: 80px; 
  }
}

@media screen and (min-width: 70em) and (min-device-width: 1024px) {
  body {
    max-width: 60em;
    margin: auto;
  }
}

table td,
table th {
  border: 1px solid #aaaaaa;
  padding: 4px 10px;
  padding-left: 10px;
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
/*  background: white; */
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
/*  background: black; */
  border-bottom: 2px solid #444444;
}

table thead th {
  font-size: 1rem;
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

.footer-container {
    display:grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto;
}

@media print {
  button,
  :placeholder-shown,
  .debug,
  .footer-container,
  .more {
    display: none;
  }
}
</style>
