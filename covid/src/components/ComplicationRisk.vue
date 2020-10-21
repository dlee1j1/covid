<template>
<div id="complications">
<table class="purpleTable">
    <thead>
        <tr>
            <th colspan="2">UNDERSTANDING YOUR RISK FOR COVID-19 COMPLICATIONS</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2">Understanding your risk for serious COVID-19 complications can help you decide whether to meet with others face-to-face. 
                Older ages and having certain health conditions are the main risk factors for COVID-19 complications. However,
                other household members should factor into your overall risk for COVID complications. If you get infected, you may infect them 
                and put them at risk for COVID-19 complications. Together, these considerations help to
                determine your <em>Overall Risk</em> for COVID-19 complications. 
            </td>
        </tr>
        <tr>
            <td>What age group are you in?
                <more teaser='How does age impact your risk?'> Older people have substantially greater risk for
                    COVID-19 complications, hospitalizations, ICU care, and
                    deaths. Those in older age groups are assigned a higher risk
                    score: &lt;30, 30-49, 50-64, and &ge;65 has a risk score of 0.5, 1, 2,
                    and 3, respectively </more>
            </td>
            <td> <DictSelect v-model="Self.age" :dict=AgeDict></DictSelect> </td>
        </tr>
        <tr>
            <td>How many pre-existing health conditions do you have that put you at increased risk of COVID-19 complications?
                <more teaser="Learn more about health conditions that increase risk."> Those with one or more pre-existing health
                    conditions are more likely to develop serious complications
                    when infected with COVID-19. Those with more pre-existing
                    health conditions are assigned a higher risk score: Zero, one,
                    or more than one health conditions has a risk score of 1, 2,
                    and 3, respectively. The most common health conditions associated with serious COVID-19 
                    complications include: obesity, cardiovascular diseases, chronic respiratory diseases, chronic
                    kidney diseases, diabetes, hypertension, cancer, immunosuppressive drugs. A full list can
                be found on the <a href="https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/people-with-medical-conditions.html" target="_blank">CDC website</a>.</more>
            </td>
            <td> <DictSelect  v-model="Self.health" :dict="HealthDict"></DictSelect></td>
        </tr>
        <tr>
            <td>Your Calculated Risk Score
                <more teaser="How is Risk Score calculated?"> Being older and having pre-existing health conditions puts 
                    you at much greater risk for serious COVID-19 complications
                     than if you only have one but not the other.  
                     Your calculated risk score is determined by multiplying the risk score for your age with the risk score for
                    your number of pre-existing health conditions. This risk score ranges between 0.5 to 9.
                </more>
            </td>
            <td><input readonly=true :value="Self.score() | decimal" :key="Self.score()"> 
            </td>
        </tr>
        <tr>
            <td>Your Estimated Risk
                <more>  
                    Estimated Risk provides a qualitative estimate of your risk using your calculated risk score. 
                    Your risk is very low if the risk score is &lt;1, low if 1-2, medium if 3-5, high if &gt;5   
                </more>
            </td>
            <td><input readonly=true :value="Self.risk()" :key="Self.risk()">
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" class=bold>Among those living with you</td>
        </tr>
        <tr>
            <td>What is the age group of the oldest person you are living with?
                <more teaser='How does age impact risk?'> Older people have substantially greater risk for
                    COVID-19 complications, hospitalizations, ICU care, and
                    deaths. Those in older age groups are assigned a higher risk
                    score: &lt;30, 30-49, 50-64, and &ge;65 has a risk score of 0.5, 1, 2,
                    and 3, respectively. Those living alone are assigned a risk score of zero.
                 </more>
            </td>
            <td> <DictSelect v-model="Others.age" :dict=OthersAgeDict></DictSelect> </td>
        </tr>
        <template v-if="(Others.age==null) || Others.age[1] > 0">
        <tr>
            <td>Among those living with you, think about the person with the highest number of pre-existing health conditions 
                that put him/her at increased risk of COVID-19 complications. How many health conditions does that person have?
                <more teaser="Learn more about health conditions that increase risk"> Those with one or more pre-existing health
                    conditions are more likely to develop serious complications
                    when infected with COVID-19. Those with more pre-existing
                    health conditions are assigned a higher risk score: Zero, one,
                    or more than one health conditions has a risk score of 1, 2,
                    and 3, respectively.</more>
            </td>
            <td> <DictSelect  v-model="Others.health" :dict="HealthDict"></DictSelect></td>
        </tr>
        <tr>
            <td>Risk score for others you live with 
                <more teaser="How is Risk Score calculated?"> Being older <b>and</b> having pre-existing health conditions puts 
                    a person at much greater risk for serious COVID-19 complications
                     than if they only have one but not the other.  
                     Therefore, the calculated risk score is determined by multiplying the risk score for oldest person you are living with
                       the risk score for the person with the highest number of pre-existing health conditions. 
                    For simplicity, we are using the same calculation for this score even if the 
                    previous answers refer to two different person.
                </more>
            </td>
            <td><input readonly=true :value="Others.score() | decimal" :key="Others.score()">
            </td>
        </tr>
        <tr>
            <td>Risk of those living with you
                <more>  
                    Calculated Risk provides a qualitative estimate of the risk for those living with you. 
                    Their risk is very low if the risk score is &lt;1, low if 1-2, medium if 3-5, high if &gt;5   
                </more>
            </td>
            <td><input readonly=true :value="Others.risk()" :key="Others.risk()">
            </td>
        </tr>
        </template>
        <tr> 
            <td> Your Overall Risk for Covid-19 Complications 
            <more>
            Comparing your estimated risk for COVID-19 complications to the risk of those living with you. Your overall risk is the higher of the two. 
            This is because you have to consider the impact on others if you should become infected and then transmit COVID-19 to others who live with you. 
            Their risk of developing serious complications is part of your overall risk.            
            </more>
            </td>
            <td><input readonly=true :value="overallRisk()" :key="overallRisk()">
            </td>
        </tr>
        <tr v-if="overallRisk()">
            <td colspan="2">
            <b>How to use your risk assessment result.</b> Since you have <b>{{overallRisk()}}</b> overall complication risk, {{riskAdvice[overallRisk()]}} 
            <hr>
            <LocalInfo/>
            </td>
        </tr>
    </tbody>
</table>
 
    <more teaser="Recommendations for different complication risk levels..." retain=true style="font-size:larger;">
    <ul>
        <li v-for="(advice,risk) in riskAdvice" :key=risk>
        <more :teaser="'If you have <b>' + risk + '</b> complication risk...'" retain=true >
           {{advice}}
        </more>  
    </li>    
    </ul>
    </more>
    <div> 
        <span v-if="debug" class="debug" :key="debug" > <input placeholder="key for local storage (optional)" v-model="key">
            <button @click="load()">Load</button> <button @click="save()">Save</button> </span>   
        <button type="button" @click="resetFields()">Reset</button> 
    </div>
</div>
</template>

<script>
    import more from "./more.vue"
    import "./filters.js"
    import {amend} from "../shared.js"
    import {ComplicationRisk} from "./ComplicationRisk.js"
    import DictSelect from "./DictSelect.vue"
    import LocalInfo from "./LocalInfo.vue"


    const AgeDict = {
        "Under 30":0.5,
        "30-49":1,
        "50-64":2,
        "over 65":3
    }

    const OthersAgeDict = {
        "Under 30":0.5,
        "30-49":1,
        "50-64":2,
        "over 65":3,
        "I live alone":0
    }


    const HealthDict = {
        0:1,
        1:2,
        "more than 1":3
    }

    const riskAdvice = {
        'High': `consider only meeting others in person when the level of COVID-19 infection in the community is low or very low. 
                If you decide to meet with others, protect yourself by meeting them outdoor or in a larger room with good ventilation. 
                Always use facemask and maintain social distance of at least 6 feet. 
                When forming a group bubble with others, consider only meeting with individuals who have a very low risk of having COVID-19 infection.
                Have your group members assess their risk of having COVID-19 using this assessment tool.`,
        'Medium':`consider meeting with others in person when the level of COVID-19 infection in the community is at a medium level or lower.
                If you decide to meet with others, protect yourself by meeting them outdoor or in a larger room with good ventilation. 
                Always use facemask and maintain social distance of at least 6 feet. 
                When forming a group bubble with others, consider meeting with individuals who have a low or very low risk of having COVID-19 infection.
                Have your group members assess their risk of having COVID-19 using this assessment tool.`,
        'Low':`you can meet with others in person when the level of COVID-19 infection in the community is at a medium level or lower. 
            If you decide to meet with others, consider meeting them outdoor or in a room with good ventilation. 
            Always use facemask and maintain social distance of at least 6 feet. When forming a bubble with others, 
            meet with individuals who have a medium or lower risk of having COVID-19 infection.
            Have your group members assess their risk of having COVID-19 using this assessment tool.`,
        'Very Low': `you can meet with others in person as long as your local public health department allows it. 
            If you decide to meet with others, consider meeting them outdoor or in a room with good ventilation. 
            Always use facemask and maintain social distance of at least 6 feet. 
            When forming a group bubble, you can meet with individuals with a broad range of risk of having COVID-19 infection.
            However, it is generally better to meet with those with lower risk of infection. 
            Have your group members assess their risk of having COVID-19 using this assessment tool.`
    }

    export default {
        props: ["debug"],
        data() { 
            return(                 
                {
                    Self: new ComplicationRisk("self"),
                    Others: new ComplicationRisk("others"),
                    PerceivedRisk: null,
                    key:null
                } )
        },
        created () {
            this.AgeDict = AgeDict
            this.HealthDict = HealthDict
            this.OthersAgeDict = OthersAgeDict
            this.riskAdvice = riskAdvice
        },
        components : {
            more,
            DictSelect,
            LocalInfo
        },
        methods: {
            overallRisk() {

                let risk = this.Self.risk();
                if (risk && (this.Others.score() > this.Self.score())) {
                    risk = this.Others.risk()
                }
                this.$emit("updated",this)
                return risk
            },
            
            resetFields() {
                Object.assign(this.$data, this.$options.data.call(this));
            },
        
            load(key){
                let k = 'complications' + (key || (this.key?this.key:""))
                let data = localStorage.getItem(k)
                if (!data) {return; }
                Object.assign(this.$data, JSON.parse(data))
                let cr = new ComplicationRisk()
                this.Self.__proto__ = cr
                this.Others.__proto__ = cr
            },
            save(key) {
                let complications = JSON.stringify(this.$data)
                let k = 'complications' + (key || (this.key?this.key:""))
                localStorage.setItem(k, complications )
            },
            flatten(dict) {
                this.Self.flatten(dict);
                this.Others.flatten(dict);
                amend(dict,'self','PerceivedRisk',this.PerceivedRisk)
            },
        }
    }
</script>
