<template>
<div>
    Based on your contact risk score, your risk of being infected with COVID-19 is <b>{{risk}}</b>.
    <br/>
    <more style="font-size:larger" teaser="What considerations should I have when planning to meet with others?" retain=true>
    <ul style="margin-top:2px;margin-bottom:2px">
        <li> {{advice().main}} </li>
        <li> <LocalInfo/> </li>
    </ul>
    </more>
    <br/>
    <more style="font-size:larger" teaser="Any additional considerations when forming a group bubble with others?" retain=true>
    <ul style="margin-top:2px;margin-bottom:2px">
        <li> {{advice().alt}} </li>
        <ul v-if="!advice().skip" style="margin-top:2px;margin-bottom:2px">
            <li> Ask those you live with to increase their use of face mask and practice of social distancing when they meet with other people
                (if they are not doing this all the time).</li> 
            <li> Reduce the frequency of meeting with others indoor.</li>
            <li> Move more of your close contact with others outdoor.</li>
            <li> When meeting others indoor, meet with others in as large a room as possible and open doors and windows to increase ventilation. </li>
            <li> When meeting with others, increase the use of face mask and the practice of social distancing (if you are not doing this all the time). </li>
        </ul>
    </ul>
    </more>
</div>    
</template>

<script>
import LocalInfo from "./LocalInfo.vue";
import more from "./more.vue";

const InfRiskAdvice = {
  Low:{
    main: `However, even a score close to zero does not mean you are not at risk for
      getting infected from your close
      contacts. Continue to maintain this low contact risk level if you plan to gather with 
      others in a small group, either indoor or outdoor. You are using face mask and social distancing
      appropriately. When the level of COVID-19 infection is at high level, consider meeting others
      only outdoor or in a large indoor room with good ventilation.`,
    alt: `Your indoor contact risk is already at a low level. So maintain your current level of contact with others.`,
    skip: true
  },
  Medium:{
    main: `You should consider only meeting with others outdoor or in a large indoor room with good ventilation once 
      the level of COVID-19 infection in your community is at a medium level or lower. 
      You can start meeting indoor in a small room 
      (using face mask and social distancing) when the infections drop to a low level.`,
    alt:`If you would like to gather with others in a small group, 
             consider whether there are ways to reduce your indoor contact risk 
             to a low level.`,
  },
  High: {
      main: `You should consider meeting others only outdoor (using face mask and social distancing) until the level of COVID-19 
      infection in your community drops to a medium level. Meeting in a large indoor 
      room should only take place once the level of COVID-infection has dropped to a low level.`,
      alt:`If you would like to gather with others in a small group, 
        it is important to find ways to reduce your indoor contact risk to a medium level or lower.`
  },
  "Very High": {
      main: `You should consider meeting others only outdoors (using face mask and social distancing)
      once the level of COVID-19 infection in your community has dropped to a low level. 
      You should avoid meeting indoors.`,
      alt: `If you would like to gather with others in a small group, 
      consider the following ways to reduce your indoor contact risk to a medium level or lower.`,
  }
}


export default {
  props: ["risk"], 
  methods: {
      advice() { return this.InfRiskAdvice[this.risk] }
  },
  created(){ this.InfRiskAdvice = InfRiskAdvice },
  components: {
      LocalInfo,
      more
  }
    
}
</script>