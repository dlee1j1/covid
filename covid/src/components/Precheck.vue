<template>
<div>
<h2 style="text-align:center">
Understanding your risk of being infected with COVID-19: Initial Self Check
</h2>

<b>
Before proceeding, please check the following: 
</b>
<ul class="blank">
    <li> <input type="checkbox" v-model="symptoms"> 
    I have one or more COVID-19 symptoms such as fever, cough, shortness of breath, sore throat, runny nose, 
    loss of taste or smell in the past 14 days. Full list of symptoms available at the 
    <a href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html" target="_blank">CDC Website</a>):
    <li> <input type="checkbox" v-model="contact">
    I have been in close contact with another person who has COVID-19 symptoms in the past 14 days.
    </li>
    <li> <input type="checkbox" v-model="largegroup">   
    I have spent 15 minutes or more indoor with a large group of people not wearing face masks and not practicing social distance in the past 14 days.
    </li>
</ul>
<hr/>

<h3 v-if="symptoms || contact || largegroup">
Since you checked one of the check boxes above, you already have a much higher risk for COVID-19 infection compared with other people in the community. 
You should consider getting tested for COVID-19 infection and quarantining yourself if you have or develop COVID-19 symptoms.
</h3>
<div v-if="!symptoms && !contact && !largegroup">
    <input type="checkbox" v-model="attest">
    Check box to confirm that I do not have any of the above. 
</div>
<div v-if="!symptoms && !contact && !largegroup && attest">
    <button style="font-size:large" @click="$emit('start')">Next</button>
</div>

</div>
</template>

<script>
export default {
    data() {
        return { symptoms:false, contact:false, largegroup: false, tested:false, attest:false }
    }

}
</script>

<style scoped>
ul.blank {
    list-style-type:none;
   
}

</style>