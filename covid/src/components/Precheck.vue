<template>
<div>
<h1 style="text-align:center">
Initial Self Check
</h1>

<h2>
Before proceeding, please check the following: 
</h2>
<ul class="blank">
<li> <input type="checkbox" v-model="symptoms"> 
   I have had <i><b>no symptoms</b></i> of COVID-19 in the past 14 days such as (a full list of symptoms available at the 
   <a href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html" target="_blank">CDC Website</a>):
    <ul> 
        <li> Fever or chills </li>
        <li> Cough </li>
        <li> Shortness of breath or difficulty breathing </li>
        <li> Fatigue </li>
        <li> Muscle or body aches </li>
        <li> Headache </li>
        <li> New loss of taste or smell </li>
        <li> Sore throat </li>
        <li> Congestion or runny nose </li>
        <li> Nausea or vomiting </li>
        <li> Diarrhea </li>
        <li> <a href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html" target="_blank"> Other symptoms </a> </li>
    </ul>
</li>
<li> <input type="checkbox" v-model="contact">
 I have <i><b>not been</b></i> in contact with anyone with COVID-19 symptoms in the past 14 days.
</li>
<li> <input type="checkbox" v-model="tested">
I have <i><b> not been </b></i> tested for COVID-19 due to symptoms or exposure in the past 14 days.
</li>
<li> <input type="checkbox" v-model="largegroup">   
 I have <i><b>not been</b></i> indoor with a large group of people not wearing face masks and not practicing social distance for at least 15 minutes in the past 14 days.
</li>
</ul>

<h3>
If you cannot check all  of the above, you are probably at <i><b>very high risk</b></i> for COVID-19 infection. 
</h3>
<div v-if="symptoms && contact && largegroup && tested">
    <button style="font-size:large" @click="$emit('start')">Next</button>
</div>

</div>
</template>

<script>
export default {
    data() {
        return { symptoms:false, contact:false, largegroup: false, tested:false }
    }

}
</script>

<style scoped>
ul.blank {
    list-style-type:none;
   
}

</style>