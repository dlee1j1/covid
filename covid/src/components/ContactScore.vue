
<template>
  <tbody>
    <tr>
      <td>
        Number of {{ isoutdoor ? "outdoor" : "indoor" }} close contacts you met
        with <b>{{ contact.prompt }}</b
        >?
      </td>
      <td>
        <input
          type="number"
          v-model="contact.count"
          :placeholder="contact.index + '/zero if none'"
          @input="checkContact()"
        />
      </td>
    </tr>
    <template v-if="contact.count > 0">
      <tr>
        <td class="inner">
          When you met with them, did you maintain social distance from them (at
          least 6 feet)?
          <more v-if="showscore">
            Maintaining social distance reduces the risk of COVID-19
            transmission. We assigned a score of 0.5 when social distance is
            always maintained, a score of 0.75 when it is mostly maintained, and
            a score of 1 if it is not consistent.
          </more>
        </td>
        <td>
          <BehaviorSelect
            v-model="contact.socialdistance"
            @input="updateScore()"
            :key="contact.socialdistance | keycheck"
          ></BehaviorSelect>
        </td>
      </tr>
      <tr>
        <td class="inner">
          When you met with them, did you use a face mask?
          <more v-if="showscore">
            Use of a face mask reduces the risk of COVID-19 transmission. We
            assigned a score of 0.5 when face masks were always used, a score of
            0.75 when face masks were mostly used, and a score of 1 if it was
            not consistent.
          </more>
        </td>
        <td>
          <BehaviorSelect
            v-model="contact.mask"
            @input="updateScore()"
            :key="contact.mask | keycheck"
          ></BehaviorSelect>
        </td>
      </tr>
      <tr v-if="!isoutdoor">
        <td class="inner">
          What proportion of the time did you meet them in a room the size of or
          smaller than a small restaurant or a Starbucks? (If you only met in a
          larger room, then answer “none of the time”.)
          <more v-if="inner">
            Transmission increases in smaller rooms. Those who did not meet in
            small rooms get a score of 1. Less than half the time the score is
            1.5. If ofen then the score is 2.
          </more>
        </td>
        <td>
          <DictSelect
            :dict="SmallRoomDict"
            v-model="contact.smallroom"
            @input="updateScore()"
            :key="contact.smallroom | keycheck"
          ></DictSelect>
        </td>
      </tr>
      <tr>
        <td class="inner">
          How frequently did you meet with them?
          <more v-if="inner">
            Your chances of getting infected increases the more often you are in
            close contact with people. Hence your frequency score increases with
            frequency of meetings.
            <span v-if="contact.index == 'outside'">
              Those who meet less than once a week are assigned a frequency
              score of 0.4; those meeting 1-2 times a week have a score of 0.6,
              and those meeting 3 or more times a week have a score of 0.8.
            </span>
            <span v-else>
              Those who meet less than once a week are assigned a frequency
              score of 0.5; those meeting 1-2 times a week have a score of 1,
              and those meeting 3 or more times a week have a score of 1.5.
            </span>
          </more>
        </td>
        <td>
          <DictSelect
            :dict="FrequencyDict"
            v-model="contact.frequency"
            @input="updateScore()"
            :key="contact.frequency | keycheck"
          ></DictSelect>
        </td>
      </tr>
      <tr v-if="showscore">
        <td>
          {{ isoutdoor ? "Total Outdoor" : "Indoor " + contact.index }} contact score
          <more v-if="showscore">
            We estimate your risk of getting COVID-19 when you are with close
            contact {{ contact.prompt }}
            by multiplying the number of these close contacts with whether you
            maintained social distancing,
            {{ isoutdoor ? "" : "met in smaller rooms," }}
            and used face mask, along with the frequency of your meeting your
            contacts.
          </more>
        </td>
        <td>
          <input
            readonly
            :value="contact.score() | decimal"
            :key="contact.score()"
          />
        </td>
      </tr>
    </template>
  </tbody>
</template>


<script>
import DictSelect from "./DictSelect.vue";
import BehaviorSelect from "./BehaviorSelect";
import more from "./more.vue";
import './filters.js'

const IndoorFrequencyDict = {
  "Less than once a week": 0.5,
  "1-2 times a week": 1,
  "3 or more times a week": 1.5,
};
const OutdoorFrequencyDict = {
  "Less than once a week": 0.4,
  "1-2 times a week": 0.6,
  "3 or more times a week": 0.8,
};

const SmallRoomDict = {
  "None of the time": 1,
  "Less than half of the time": 1.5,
  "More than half of the time": 2,
};

export default {
  props: ["contact", "isoutdoor", "showscore"],
  created() {
    this.SmallRoomDict = SmallRoomDict;
    this.FrequencyDict = this.isoutdoor
      ? OutdoorFrequencyDict
      : IndoorFrequencyDict;
  },
  data() {
    return {};
  },
  components: {
    more: more,
    DictSelect: DictSelect,
    BehaviorSelect: BehaviorSelect,
  },
  methods: {
    score() {
      return this.contact.score()
    },
    updateScore() {
      this.$emit("updatescore");
    },
    checkContact() {
      if (this.contact.count < 0) {
        this.contact.count = null;
      }
      this.updateScore();
    },
  },
};
</script>

<style scoped>
.inner {
  padding-left:10px;}
</style>