<template>
  <div id="infection">
    <table>
      <thead>
        <tr>
          <th colspan="2">
            UNDERSTANDING YOUR RISK OF BEING INFECTED WITH COVID-19 BASED ON YOUR CONTACT SCORE
          </th>
        </tr>
      </thead>
      <tr>
        <td colspan="2">
          <b>Contact Risk</b>: 
          <em>Risk of becoming infected from COVID-19 from your close contacts.</em>
          <br/>
          Your risk of having COVID-19 is related to the level of COVID-19 infection 
          in your community and how much close contact you have with other people.
          This assessment generates a contact score for you. The higher the score, 
          the greater your risk of being infected through your contacts.
          <p/>
          This assessment helps you understand the type of contacts that 
          increases your risk. You can use this information to reduce your contact
          risk before meeting with others.
          <p/>
          In addition, when planning to meet with others or to form a group bubble,
          it is useful know the contact risk of other individuals. 
          You may choose to only meet with individuals who have a certain level of
          contact risk.
          <p/>
          <u>Important:</u> The questions below refer only to close contacts
          during the past 14 days. Close contact is defined as being together
          within <b> 6 feet or 2 meters for at least 15 minutes</b>. Multiple
          short contacts over the past 2 weeks with the same person adding up to 
          15 minutes meets in any 24-hour period meets this definition.
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
            max = 10
            min = 0
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
            :value="HouseholdScore() | decimal"
            :key="HouseholdScore()"
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
          <input readonly :value="InsideScore() | decimal" :key="InsideScore()" />
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
          <input readonly :value="TotalScore() | decimal" :key="TotalScore()" />
        </td>
      </tr>

      <tr style="font-size: large; font-weight: bold">
        <td>
          Estimated Overall Contact Risk
          <more>
            We estimate your risk of getting infected based on your total contact score. Less than 10 - Low Risk; Over 10 but less than 20 - Medium Risk; 
            Over 20 but less than 30 - High Risk; Over 30 - Very High Risk. 
          </more>
        </td>
        <td>
          <input readonly :value="InfectionRisk()" :key="InfectionRisk()" />
        </td>
      </tr>
      <tbody v-if="!isNaN(TotalScore())"> 
      <tr>
        <td colspan="2">
            <b> Recommendations based on your COVID-19 Contact Risk results:</b> 
            Based on your contact risk score, your risk of being infected with COVID-19 is <b>{{InfectionRisk()}}</b>.
            {{InfRiskAdvice[InfectionRisk()]}}

            <div v-if="InfRiskAdviceAlt[InfectionRisk()]"> 
            <ul>
            <li> Ask those you live with to increase their use of face mask and practice of social distancing when they meet with other people
               (if they are not doing this all the time).</li> 
            <li> Reduce the frequency of meeting with others indoor.</li>
            <li> Move more of your close contact with others outdoor.</li>
            <li> When meeting others indoor, meet with others in as large a room as possible and open doors and windows to increase ventilation. </li>
            <li> When meeting with others, increase the use of face mask and the practice of social distancing (if you are not doing this all the time). </li>
            </ul>
            {{InfRiskAdviceAlt[InfectionRisk()]}}
            </div>
        <hr/>
        <LocalInfo/>
      </td>

      </tr>
      </tbody>
    </table>
    <div>
    <more style="font-size:larger" teaser='Sample Contact Risk Profiles'>
      <ul>
        <li> Low risk (score from 0 to 9.9): 
            <more teaser="A 26 year-old woman who works in a small office with three co-workers." retain=1>
            They wear masks and enforce social distance at work. Her husband works from home. 
            Neither of them meets anyone indoor except during brief shopping runs. 
            She and her husband meet once a week with another couple outside on the deck using masks and maintaining social distance.
            <ul> 
                <li> Household contact score: 3	</li>
                <li> Indoor contact score: 2.25 </li>
                <li> Outdoor contact score: 0.3 </li>
                <li> Total contact score: 5.6	 </li>
            </ul>
            </more>
        </li>
        <li> Medium risk (score from 10-19.9):
          <more teaser="A 50 year-old woman who works in a large office with other 6 other colleagues." retain=1> 
            They maintain social distance and wear masks.  Her husband works solely from home and meets but he does meet with
            a couple of friends each week, sometimes without face mask or social distance. She meets with a small group of 4 other
            women at one of their homes once a week without face mask and or maintain social distance.
            <ul>
              <li> Household contact score: 6.75 </li>
              <li> Indoor contact score: 6.25 </li>
              <li> Outdoor contact score: 0 </li>
              <li> Total contact score: 13 </li>
            </ul>
          </more>
        </li>
        <li> High risk (score from 20-20.9): 
          <more teaser="A 45 year-old man who works in restaurant with 6 other workers." retain=1> 
          They all wear masks but frequently have to work together close to each other.  His wife is an essential worker 
          who goes to work every day. She wears mask but can’t maintain social distance all of the time. Their 2 children 
          attend a school that meet in person; children wear mask at school and maintain social distance. They meet with another 
          family of 4 who come over once a week to “give the kids some social time.” Everyone wears a mask (but it is hard to keep it on the kids), 
          and they do not maintain social distance.
          <ul> 
            <li> Household contact score: 10.5 </li>
            <li> Indoor contact score: 15 </li>
            <li> Outdoor contact score: 0 </li>
            <li> Total contact score: 25.5 </li>
          </ul>
          </more>
        </li>
        <li> Very high risk (score &ge;30):
        <more teaser="A 25 year-old single man who lives his 2 parents and 2 other siblings." retain=1>
          He works in a medium size office with 6 other people. They wear masks but occasionally have meetings when they sit close to each other.
          He hangs out with a group of friends (average of 4) at a restaurant or bar a couple evenings a week. 
          Both parents are essential workers who wear masks when they work but cannot maintain social distance all the time with others.
          His 2 other siblings hang out with friends and sometimes wear masks and maintain social distance.  
          He also plays outdoor soccer with a group 12 friends.
        <ul>
          <li> Household contact score: 22.5 </li>
          <li> Indoor contact score: 15.4 </li>
          <li> Outdoor contact score: 0 </li>
          <li> Total contact score: 37.9 </li>
        </ul>
        </more>
        </li>
      </ul>
    </more>
    </div>
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
import LocalInfo from "./LocalInfo.vue"
import more from "./more.vue";
import "./filters.js";

const InfRiskAdvice = {
  Low: `However, even a score close to zero does not mean you are not at risk for
      getting infected from your close
      contacts. Continue to maintain this low contact risk level if you plan to gather with 
      others in a small group, either indoor or outdoor. You are using face mask and social distancing
      appropriately. When the level of COVID-19 infection is at high level, consider meeting others
      only outdoor or in a large indoor room with good ventilation.`,
  Medium: `If you would like to gather with others in a small group, 
             consider whether there are ways to reduce your indoor contact risk 
             to a low level.`,
  High: `If you would like to gather with others in a small group, 
        it is important to find ways to reduce your indoor contact risk to a medium level or lower.`,
  "Very High": `If you would like to gather with others in a small group, 
      it is important to find ways to reduce your indoor contact risk to at least 
      a medium level or lower.`,
};

const InfRiskAdviceAlt = {
  Medium: `If you cannot lower your contact risk, 
      you should consider only meeting with others outdoor or in a large indoor room with good ventilation once 
      the level of COVID-19 infection in your community is at a medium level or lower. 
      You can start meeting indoor in a small room 
      (using face mask and social distancing) when the infections drop to a low level.`,
  High: `If you cannot lower your contact risk, you should consider meeting others only outdoor (using face mask and social distancing) until the level of COVID-19 
      infection in your community drops to a medium level. But meeting in a large indoor 
      room should only take place once the level of COVID-infection has dropped to a low level.`,
  "Very High": `If you cannot lower your contact risk, you should consider 
      meeting others only outdoors (using face mask and social distancing)
      once the level of COVID-19 
      infection in your community has dropped to a low level. You should avoid meeting indoors.`,
};

export default Vue.extend({
  props: ["debug"],
  data() {
    return {
      HouseholdSize: null,
      HouseholdMembers: [],
      DiscardedMembers: [],
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
      key: null,
    };
  },
  created() {
    this.InfRiskAdvice = InfRiskAdvice;
    this.InfRiskAdviceAlt = InfRiskAdviceAlt;
    this.toggleCount = 0;
  },
  components: {
    more: more,
    ContactScore: ContactScore,
    HouseholdMember: HouseholdMember,
    LocalInfo
  },
  methods: {
    checkkey(e) {
      if (e.key === ",") {
        this.toggleCount++;
      } else {
        this.toggleCount = 0;
      }
      if (this.toggleCount >= 2) {
        this.$emit("toggleDebug");
        this.toggleCount = 0;
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

    InsideScore() {
      let sum = 0;
      let key;
      for (key in this.Insides) {
        sum += this.Insides[key].score();
      }
      return sum;
    },

    HouseholdScore() {
      let sum = 0;
      let member;
      sum = 0;
      for (member of this.HouseholdMembers) {
        sum += member.score();
      }
      return sum;
    },

    TotalScore() {
      return this.HouseholdScore() + this.InsideScore() + this.Outside.score();
    },

    UpdateTotalScore() {
      this.$emit("updated", this);
    },

    InfectionRisk() {
      let TotalScore = this.TotalScore();
      if (isNaN(TotalScore)) {
        return null;
      }
      if (TotalScore < 10) {
        return "Low";
      }
      if (TotalScore < 20) {
        return "Medium";
      }
      if (TotalScore < 30) {
        return "High";
      }
      return "Very High";
    },
    resetFields() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
    load(key) {
      let k = "infection" + (key || (this.key ? this.key : ""));
      let data = localStorage.getItem(k);
      if (!data) {
        return;
      }
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
      amend(dict, "", "HouseholdScore", this.HouseholdScore());
      let hm;
      for (hm of this.HouseholdMembers) {
        hm.flatten(dict);
      }
      let cs;
      for (cs in this.Insides) {
        this.Insides[cs].flatten(dict);
      }
      amend(dict, "", "InsideScore", this.InsideScore());
      this.Outside.flatten(dict);
      amend(dict, "", "TotalScore", this.TotalScore());
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
