<template>
<div>
    {{advice().a}}
    <br/>  
    <more style="font-size:larger" teaser="What considerations should I have when planning to meet with others?" retain=true> 
    <ul style="margin-top:2px;margin-bottom:2px">
        <li> {{advice().meet}} </li>
        <li v-if="advice().meet2"> {{advice().meet2}} </li>
        <li> <LocalInfo/> </li>
    </ul>
    </more>
    <br/>
    <more style="font-size:larger" teaser="What should I consider when forming a group bubble with others?" retain=true> 
    <ul style="margin-top:2px;margin-bottom:2px">
        <li> {{advice().bubble}}</li>
    </ul>
    </more>
</div>
</template>

<script>
import LocalInfo from "./LocalInfo.vue"
import more from "./more.vue"

const riskAdvice = {
    High: {a:`You should be very concerned about getting COVID-19 infection from others.`,
         meet: `Consider only meeting others in person when the level of COVID-19 infection in the community is low or very low. 
            If you decide to meet with others, protect yourself by meeting them outdoor. 
            Always use facemask and maintain social distance of at least 6 feet.`,
         bubble:`When forming a group bubble with others, consider only meeting with individuals who have a low contact risk.
            Have your group members assess their contact risk using this assessment tool`
    },
    Medium: {
        a: `You should at least be moderately concerned about getting COVID-19 infection from others.`, 
        meet: `Consider only meeting with others in person when the level of COVID-19 infection 
                in the community is low or very lower. 
                If you decide to meet with others, protect yourself by meeting them outdoor or in a 
                larger room with good ventilation. Always use facemask and maintain social distance of at least 6 feet.`,
        bubble: `When forming a group bubble with others, consider meeting with individuals who have a medium contact risk, 
                or lower. Have your group members assess their contact risk using this assessment tool.`},
  Low:{ a:`You may only have some concern about getting COVID-19 infection from others.`, 
        meet: `When the level of COVID-19 infection in the community is still high, 
                consider limiting your meetings with others to protect yourself and others. 
                If you decide to meet with others, consider meeting them outdoor or in a room with good ventilation.`, 
        meet2: `Once community level of COVID-19 is at a medium level or lower, you can meet others in smaller rooms.
                Always use facemask and maintain social distance of at least 6 feet.`, 
        bubble:`When forming a bubble with others, meet with individuals who have a medium or lower contact risk. 
                Have your group members assess their contact risk using this assessment tool.`},
  "Very Low":{
        a: `You may not be very concerned about getting COVID-19 infection from others. 
                Nevertheless, you can play your part to protect others in case you should get infected.`,
        meet:`When the level of COIVD-19 in your community is high, consider limiting your meetings with others. 
                You can meet with others in person as long as it meets your local public health department guidelines. 
                If you decide to meet with others, consider meeting them outdoor or in a room with good ventilation. 
                Always use facemask and maintain social distance of at least 6 feet.`,
        bubble:`When forming a group bubble, you can meet with individuals with a broad range of risk of having COVID-19 infection, 
                but it is generally better to meet with those with lower risk of infection. 
                Have your group members assess their contact risk using this assessment tool.`
    }
}

export default {
    props:["risk"],
    methods: {
        advice() {
            return riskAdvice[this.risk];
        }
    },
    components: { LocalInfo, more }
}
</script>