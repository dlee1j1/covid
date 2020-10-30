<template>
  <div id="complications">
    <table class="purpleTable">
      <thead>
        <tr>
          <th colspan="2">
            UNDERSTANDING YOUR RISK FOR COVID-19 COMPLICATIONS
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">
            <b> Complication risk </b>:
              Risk of serious complications should you become infected with
              COVID-19.
            <br />
            Knowing your risk of serious complications should you become
            infected with COVID-19 can help you decide when it is appropriate
            for you to meet with others, what kind of setting for such meetings,
            and with whom are safest to form a group bubble.
            <p />
            Older ages and having certain health conditions are the main risk
            factors for COVID-19 complications. However, other household members
            should factor into your overall risk for COVID-19 complications. If
            you get infected, you may infect them and put them at risk for
            COVID-19 complications. Together, these considerations help to
            determine your <em> Overall Risk </em> for COVID-19 complications.
            <p />
            Also, of note, these are general categories for risk of
            complications. Each individual may have variable severity of
            clinical outcomes from COVID-19 despite the estimated complication
            risk provided by this tool.
          </td>
        </tr>
        <tr>
          <td>
            What age group are you in?
            <more v-if="inner" teaser="How does age impact your risk?">
              Older people have substantially greater risk for COVID-19
              complications, hospitalizations, ICU care, and deaths. Those in
              older age groups are assigned a higher risk score: &lt;30, 30-49,
              50-64, and &ge;65 has a risk score of 0.5, 1, 2, and 3,
              respectively
            </more>
          </td>
          <td><DictSelect v-model="Self.age" :dict="AgeDict"></DictSelect></td>
        </tr>
        <tr>
          <td>
            How many pre-existing health conditions do you have that put you at
            increased risk of COVID-19 complications? The most common health
            conditions associated with serious COVID-19 complications include:
            obesity, cardiovascular diseases, chronic respiratory diseases,
            chronic kidney diseases, diabetes, hypertension, cancer,
            immunosuppressive drugs.
            <more v-if="inner"
              teaser="Learn more about health conditions that increase risk."
            >
              Those with one or more pre-existing health conditions are more
              likely to develop serious complications when infected with
              COVID-19. Those with more pre-existing health conditions are
              assigned a higher risk score: Zero, one, or more than one health
              conditions has a risk score of 1, 2, and 3, respectively. A full
              list of pre-existing health conditions that puts you at increased
              risk of complications can be found on the
              <a
                href="https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/people-with-medical-conditions.html"
                target="_blank"
                >CDC website</a
              >.</more
            >
          </td>
          <td>
            <DictSelect v-model="Self.health" :dict="HealthDict"></DictSelect>
          </td>
        </tr>
        <tr v-if="inner">
          <td>
            Your Calculated Complication Risk Score
            <more teaser="How is Complication Risk Score calculated?">
              Being older and having pre-existing health conditions puts you at
              much greater risk for serious COVID-19 complications than if you
              only have one but not the other. Your calculated risk score is
              determined by multiplying the risk score for your age with the
              risk score for your number of pre-existing health conditions. This
              risk score ranges between 0.5 to 9.
            </more>
          </td>
          <td>
            <input
              readonly="true"
              :value="Self.score() | decimal"
              :key="Self.score()"
            />
          </td>
        </tr>
        <tr v-if="inner">
          <td>
            Your Estimated Complication Risk
            <more>
              Estimated Complication Risk provides a qualitative estimate of
              your risk using your calculated risk score. Your risk is very low
              if the risk score is &lt;1, low if 1-2, medium if 3-5, high if
              &gt;5
            </more>
          </td>
          <td>
            <input readonly="true" :value="Self.risk()" :key="Self.risk()" />
          </td>
        </tr>
        <tr>
          <td colspan="2" class="bold">Among those living with you</td>
        </tr>
        <tr>
          <td>
            What is the age group of the oldest person you are living with?
            <more v-if="inner" teaser="How does age impact risk?">
              Older people have substantially greater risk for COVID-19
              complications, hospitalizations, ICU care, and deaths. Those in
              older age groups are assigned a higher risk score: &lt;30, 30-49,
              50-64, and &ge;65 has a risk score of 0.5, 1, 2, and 3,
              respectively. Those living alone are assigned a risk score of
              zero.
            </more>
          </td>
          <td>
            <DictSelect
              placeholder="live alone? oldest housemate"
              v-model="Others.age"
              :dict="OthersAgeDict"
            ></DictSelect>
          </td>
        </tr>
        <template v-if="Others.age != null && Others.age[1] > 0">
          <tr>
            <td>
              Among those living with you, think about the person with the
              highest number of pre-existing health conditions that put him/her
              at increased risk of COVID-19 complications. How many health
              conditions does that person have?
              <more v-if="inner"
                teaser="Learn more about health conditions that increase risk"
              >
                Those with one or more pre-existing health conditions are more
                likely to develop serious complications when infected with
                COVID-19. Those with more pre-existing health conditions are
                assigned a higher risk score: Zero, one, or more than one health
                conditions has a risk score of 1, 2, and 3, respectively.</more
              >
            </td>
            <td>
              <DictSelect
                v-model="Others.health"
                :dict="HealthDict"
              ></DictSelect>
            </td>
          </tr>
          <tr v-if="inner">
            <td>
              Complication Risk score for others you live with
              <more v-if="inner" teaser="How is Risk Score calculated?">
                Being older <b>and</b> having pre-existing health conditions
                puts a person at much greater risk for serious COVID-19
                complications than if they only have one but not the other.
                Therefore, the calculated risk score is determined by
                multiplying the risk score for oldest person you are living with
                the risk score for the person with the highest number of
                pre-existing health conditions. For simplicity, we are using the
                same calculation for this score even if the previous answers
                refer to two different person.
              </more>
            </td>
            <td>
              <input
                readonly="true"
                :value="Others.score() | decimal"
                :key="Others.score()"
              />
            </td>
          </tr>
          <tr v-if="inner">
            <td>
              Estimated Complication Risk of those living with you
              <more>
                Calculated Risk provides a qualitative estimate of the risk for
                those living with you. Their risk is very low if the risk score
                is &lt;1, low if 1-2, medium if 3-5, high if &gt;5
              </more>
            </td>
            <td>
              <input
                readonly="true"
                :value="Others.risk()"
                :key="Others.risk()"
              />
            </td>
          </tr>
        </template>
        <tr v-if="inner">
          <td>
            Your Overall Estimated Complication Risk from Covid-19
            <more>
              Your overall estimated complication risk is the higher of the your
              personal estimated complication risk and the estimated
              complication risk of those living with you. This is because you
              have to consider the impact on others if you should become
              infected then transmit COVID-19 to others who live with you. Their
              risk of developing serious complications is part of your overall
              estimated complication risk.
            </more>
          </td>
          <td>
            <input
              readonly="true"
              :value="overallRisk()"
              :key="overallRisk()"
            />
          </td>
        </tr>
        <tr v-if="overallRisk() && reveal">
          <td colspan="2" style="padding: 12px">
            <div style="font-size: large">
              Your Estimated Overall Complication Risk:
              <b>{{ overallRisk() }}</b>.
            </div>
            <comp-rec :risk="overallRisk()"/>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="reveal">
      <u>Note on Risk Tolerance</u>
      A person may have a greater concern about getting infected than is
      reflected by their overall complication risk. Or a person may have less
      concern about getting infected than their overall complication risk
      indicates. Below are recommendations for other risk levels.
      <br />
      <more
        teaser="Recommendations for different complication risk levels..."
        retain="true"
        style="font-size: larger"
      >
        <ul style="top-margin:2px">
          <li v-for="risk of Risks" :key="risk">
            <more
              :teaser="'If you have <b>' + risk + '</b> complication risk: '"
              retain="true"
            >
              <comp-rec :risk="risk"/>
            </more>
          </li>
        </ul>
      </more>
    </div>

    <div style="width: 100%; display: flex; justify-content: center">
      <big-button v-if="!reveal && overallRisk()" @click="revealrisk()">
        Show your Complication Risk
      </big-button>
    </div>

    <div v-if="reveal">
      <div>
        <span v-if="debug" class="debug" :key="debug">
          <input placeholder="key for local storage (optional)" v-model="key" />
          <button @click="load()">Load</button>
          <button @click="save()">Save</button>
        </span>

        <button @click="toggleinner()">
          {{ this.inner ? "Hide" : "Show" }} the Computation
        </button>
        <button type="button" @click="resetFields()" style="margin-left: 5px">
          Erase the data and Restart
        </button>
      </div>
    </div>

    <div style="display: grid">
      <div style="justify-self: start">
        <slot name="previous"> </slot>
      </div>

      <div v-if="reveal" style="justify-self: end">
        <slot name="next"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
import more from "./more.vue";
import "./filters.js";
import { amend } from "../shared.js";
import { ComplicationRisk } from "./ComplicationRisk.js";
import DictSelect from "./DictSelect.vue";
import BigButton from "./BigButton.vue";
import CompRec from "./CompRec.vue"

const AgeDict = {
  "Under 30": 0.5,
  "30-49": 1,
  "50-64": 2,
  "over 65": 3,
};

const OthersAgeDict = {
  "Under 30": 0.5,
  "30-49": 1,
  "50-64": 2,
  "over 65": 3,
  "I live alone": 0,
};

const HealthDict = {
  0: 1,
  1: 2,
  "more than 1": 3,
};

const Risks = [
    "High","Medium","Low","Very Low"
]

export default {
  props: ["debug"],
  data() {
    return {
      Self: new ComplicationRisk("self"),
      Others: new ComplicationRisk("others"),
      key: null,
      reveal: false,
      inner: false,
    };
  },
  created() {
    this.AgeDict = AgeDict;
    this.HealthDict = HealthDict;
    this.OthersAgeDict = OthersAgeDict;
    this.Risks = Risks;
  },
  components: {
    more,
    DictSelect,
    BigButton,
    CompRec
  },
  methods: {
    revealrisk() {
      this.reveal = true;
    },
    toggleinner() {
      this.inner = !this.inner;
    },
    overallRisk() {
      if (isNaN(this.Self.score()) || isNaN(this.Others.score())) {
        return null;
      }

      let risk = this.Self.risk();
      if (risk && this.Others.score() > this.Self.score()) {
        risk = this.Others.risk();
      }
      this.$emit("updated", this);
      return risk;
    },

    resetFields() {
      Object.assign(this.$data, this.$options.data.call(this));
    },

    load(key) {
      let k = "complications" + (key || (this.key ? this.key : ""));
      let data = localStorage.getItem(k);
      if (!data) {
        return;
      }
      Object.assign(this.$data, JSON.parse(data));
      let cr = new ComplicationRisk();
      this.Self.__proto__ = cr;
      this.Others.__proto__ = cr;
    },
    save(key) {
      let complications = JSON.stringify(this.$data);
      let k = "complications" + (key || (this.key ? this.key : ""));
      localStorage.setItem(k, complications);
    },
    flatten(dict) {
      this.Self.flatten(dict);
      this.Others.flatten(dict);
      amend(dict, "self", "PerceivedRisk", this.PerceivedRisk);
    },
  },
};
</script>
