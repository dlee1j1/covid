<template>
  <tbody>
    <tr></tr>
    <tr>
      <td colspan="2" style="padding-left: 1rem" >
        <span class="subcategory"> Housemate {{ mem.index + 1 }} of {{ memberscount }} </span>
        <span style="float: right; margin-right: 1rem">
          <input placeholder="Firstname/Nickname (optional)" v-model="mem.name" maxlength=10 />
          <span style="margin-left: 1rem"></span>
          <select v-model="mem.relationship">
            <option :value="null" disabled="true">Relation to you</option>
            <option>spouse</option>
            <option>child</option>
            <option>sibling</option>
            <option>parent</option>
            <option>relative</option>
            <option>other</option>
          </select>
        </span>
      </td>
    </tr>
    <tr>
      <td>
        When meeting with other people indoor, does {{identifier("he/she")}} maintain social
        distance (at least 6 feet)?
        <more>
          Maintaining social distance reduces the risk of COVID-19 transmission.
          We assigned a score of 0.5 when social distance was always maintained,
          a score of 0.75 when it was mostly maintained, and a score of 1 if it
          was not consistent. If you do not know, we assume that social distance
          was not consistently maintained and assign a score of 1.
        </more>
      </td>
      <td>
        <BehaviorSelect
          v-model="mem.socialdistance"
          :hasunknown="true"
          @input="updateScore()"
          :key="mem.socialdistance | keycheck"
        ></BehaviorSelect>
      </td>
    </tr>
    <tr>
      <td>
        When meeting with other people indoor, does {{identifier("he/she")}} use a face mask?
        <more>
          Use of a face mask reduces the risk of COVID-19 transmission. We
          assigned a score of 0.5 when face masks were always used, a score of
          0.75 when face masks were mostly used, and a score of 1 if it was not
          consistent. If you do not know, we assume that face masks was not
          consistently used and assign a score of 1.
        </more>
      </td>
      <td>
        <BehaviorSelect
          v-model="mem.mask"
          :hasunknown="true"
          @input="updateScore()"
          :key="mem.mask | keycheck"
        ></BehaviorSelect>
      </td>
    </tr>
    <tr v-if="showscore">
      <td style="text-transform: capitalize">
        Infection risk score ({{ identifier() }})
        <more teaser="How did we calculate this score?">
          We multiplied the scores from mask-wearing and social distancing, and then by a factor of 12. 
          This factor takes into account a much higher risk of transmission among those who live together 
          due to several contributing causes including small indoor environment and high frequency of contact.
        </more>
      </td>
      <td>
        <input readonly :value="mem.score() | decimal" :key="mem.score()" />
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import Vue from "vue";
import more from "./more.vue";
import BehaviorSelect from "./BehaviorSelect.vue";
import './filters.js'

export default Vue.extend({
  props: ["mem", "memberscount","showscore"],

  components: {
    more: more,
    BehaviorSelect: BehaviorSelect,
  },
  methods: {
    updateScore() {
      this.score = this.mem.score();
      this.$emit("updatescore");
    },
    identifier(def) {
      if (this.mem.name) {
        return this.mem.name;
      }
      let rel = this.mem.relationship;
      if (rel && rel != "other") {
        return `your ${rel}`;
      }
      if (def) { return def }
      return `housemate ${this.mem.index + 1} of ${this.memberscount}`;
    },
  },
});
</script>
