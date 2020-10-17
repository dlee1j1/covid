<template>
  <div id="infection">
    <table>
      <thead>
        <tr>
          <th colspan="2">
            UNDERSTANDING YOUR RISK OF BEING INFECTED WITH COVID-19
          </th>
        </tr>
      </thead>
      <tr>
        <td colspan="2">
          Your risk of getting COVID-19 is related to how much close contact you
          have with other people and the chance that they are infected with
          COVID-19. To assess your risk, this assessment generates a contact
          score for you. The higher the score, the greater your risk of being
          infected through your contacts. You may choose to meet with others who
          have a certain risk of being infected with COVID-19.
          <p />
          <u>Important:</u> The questions below refer only to close contacts
          during the past 14 days. Close contact is defined as being together
          within <b> 6 feet or 2 meters for at least 15 minutes</b>. Multiple
          short contacts over the past 2 weeks with the same person adding up to 15 minutes meets
          this definition.
        </td>
      </tr>
      <tr>
        <td colspan="2" class="category">Contacts of people living with you</td>
      </tr>
      <tr>
        <td>
          Consider the people you live with, how many of them met with other
          people <b>indoor</b> over the past 2 weeks?
          <more teaser="What about those who do not go out or you live alone?">
            Do not include anyone living with you who did not meet with anyone
            outside your home, e.g. a toddler, stay-at-home spouse. If you live alone, enter zero.
          </more>
        </td>
        <td>
          <input
            type="number"
            v-model="HouseholdSize"
            placeholder="household"
            @input="checksize()"
            @keyup="checkkey($event)"
          />
        </td>
      </tr>

      <tr v-if="HouseholdMembers.length > 0">
        <td colspan="2">
          List each of these individuals and their relationship with you: spouse
          or significant other, child, parent, sibling, other relative, or
          other.
        </td>
      </tr>
      <tbody
        v-for="member in HouseholdMembers"
        is="HouseholdMember"
        :key="member.index"
        :mem="member"
        :memberscount="HouseholdSize"
        @updatescore="UpdateTotalScore()"
      ></tbody>
      <tr v-if="HouseholdSize > 0">
        <td>
          Total Household Contact Score
          <more>
            We added up each of your household member's infection risk score to
            come up with your household contact score.
          </more>
        </td>
        <td>
          <input
            readonly
            :value="HouseholdScore | decimal"
            :key="HouseholdScore"
          />
        </td>
      </tr>

      <tr>
        <td colspan="2" class="category">Close indoor contacts</td>
      </tr>
      <tr>
        <td colspan="2">
          Consider the close contacts whom you don&apos;t live with but met with
          indoor over the past 2 weeks. What is the number of close contact you
          met with at work, at social activities, at school, or at other
          activities?
        </td>
      </tr>
      <tbody
        v-for="insidetype in Insides"
        is="ContactScore"
        :contact="insidetype"
        :key="insidetype.index"
        @updatescore="UpdateTotalScore()"
      ></tbody>
      <tr>
        <td>Total Indoor Contact Score</td>
        <td>
          <input readonly :value="InsideScore | decimal" :key="InsideScore" />
        </td>
      </tr>

      <tr>
        <td colspan="2" class="category">Close outdoor contacts</td>
      </tr>
      <tr>
        <td colspan="2">
          Consider the close contacts whom you don&apos;t live with but met with
          outdoor over the past 2 weeks.
        </td>
      </tr>

      <tbody
        is="ContactScore"
        :contact="Outside"
        :isoutdoor="true"
        @updatescore="UpdateTotalScore()"
      ></tbody>

      <tr style="font-size: large; font-weight: bold">
        <td>
          Total Overall Contact Score
          <more>
            Your total overall contact risk score is the sum of your risk from those you
            live with and your risk from being in close contact with others
            indoor and outdoor.
          </more>
        </td>
        <td>
          <input readonly :value="TotalScore | decimal" :key="TotalScore" />
        </td>
      </tr>

      <tr style="font-size: large; font-weight: bold">
        <td>
          Estimated Overall Contact Risk
          <more>
            Your risk is....
          </more>
        </td>
        <td>
          <input readonly  />
        </td>
      </tr>

    </table>
    <div style="float: left">
      <span v-if="debug" class="debug" :key="debug">
        <input placeholder="key for local storage (optional)" v-model="key" />
        <button @click="load()">Load</button>
        <button @click="save()">Save</button>
      </span>
      <button type="button" @click="resetFields()">Reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { amend } from "../shared.js";
import { ContactScoreData } from "./ContactScoreData.js";
import { HouseholdMemberData } from "./HouseholdMemberData.js";
import ContactScore from "./ContactScore.vue";
import HouseholdMember from "./HouseholdMember.vue";
import more from "./more.vue";

export default Vue.extend({
  props:["debug"],
  data() {
    return {
      HouseholdSize: null,
      HouseholdMembers: [],
      DiscardedMembers: [],
      HouseholdScore: 0,
      InsideScore: 0,
      Insides: {
        Work: new ContactScoreData("work"),
        SocialActivities: new ContactScoreData(
          "social activities",
          "through social activities"
        ),
        School: new ContactScoreData("school"),
        Other: new ContactScoreData(
          "other activities",
          "through other activities"
        ),
      },
      Outside: new ContactScoreData("outside", "outside"),
      TotalScore: 0,
      key: null,
    };
  },
  components: {
    more: more,
    ContactScore: ContactScore,
    HouseholdMember: HouseholdMember,
  },
  methods: {
    checkkey(e) {
      if (e.key === "@") {
        this.$emit("toggleDebug");
      }
    },
    checksize() {
      if (this.HouseholdSize < 0) {
        this.HouseholdSize = 0;
        this.$forceUpdate();
      }
      if (this.HouseholdSize > 10) {
        this.HouseholdSize = 10;
        this.$forceUpdate();
      }

      while (this.HouseholdMembers.length < this.HouseholdSize) {
        if (this.DiscardedMembers.length > 0) {
          this.HouseholdMembers.push(this.DiscardedMembers.pop());
        } else {
          this.HouseholdMembers.push(
            new HouseholdMemberData(this.HouseholdMembers.length)
          );
        }
      }
      while (this.HouseholdMembers.length > this.HouseholdSize) {
        this.DiscardedMembers.push(this.HouseholdMembers.pop());
      }
      this.UpdateTotalScore();
    },
    UpdateTotalScore() {
      this.TotalScore = 0;
      let member;

      this.HouseholdScore = 0;
      for (member of this.HouseholdMembers) {
        this.HouseholdScore += member.score();
      }

      this.InsideScore = 0;
      let key;
      for (key in this.Insides) {
        this.InsideScore += this.Insides[key].score();
      }

      this.TotalScore =
        this.HouseholdScore + this.InsideScore + this.Outside.score();
      this.$emit("updated",this)
    },
    resetFields() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
    load(key) {
      let k = "infection" + (key || (this.key ? this.key : ""));
      let data = localStorage.getItem(k);
      if (!data) {return;}
      Object.assign(this.$data, JSON.parse(data));
      let hm = new HouseholdMemberData();
      let h;
      for (h of this.HouseholdMembers) {
        h.__proto__ = hm;
      }

      for (h of this.DiscardedMembers) {
        h.__proto__ = hm;
      }

      let cs = new ContactScoreData();
      let i;
      for (i in this.Insides) {
        this.Insides[i].__proto__ = cs;
      }
      this.Outside.__proto__ = cs;
      this.$forceUpdate();
    },
    save(key) {
      let infection = JSON.stringify(this.$data);
      let k = "infection" + (key || (this.key ? this.key : ""));
      localStorage.setItem(k, infection);
    },
    flatten(dict) {
      amend(dict, "", "HouseholdSize", this.HouseholdSize);
      amend(dict, "", "HouseholdScore", this.HouseholdScore);
      let hm;
      for (hm of this.HouseholdMembers) {
        hm.flatten(dict);
      }
      let cs;
      for (cs in this.Insides) {
        this.Insides[cs].flatten(dict);
      }
      amend(dict, "", "InsideScore", this.InsideScore);
      this.Outside.flatten(dict);
      amend(dict, "", "TotalScore", this.TotalScore);
    },
  },
});
</script>

<style scoped>
::v-deep .category {
  font-weight: bold;
  text-align: center;
}

::v-deep .subcategory {
  font-style: italic;
}

</style>
