<template>
<body>
<div class="container">
    <div class="picture">
        <img src="../assets/social.jpg">
    </div>

    <div class="item-1">
        PEOPLE  ARE EXPERIENCING A GROWING DESIRE TO GATHER TOGETHER 
        DURING THE 
        COVID-19 PANDEMIC
    </div>

    <div class="item-2">
        BUT IS IT SAFE FOR ME TO MEET WITH OTHERS?
        <br/>
        HOW CAN I GATHER SAFELY WITH OTHERS?
    </div>

    <div class="item-3">
        THIS 2-PART 
        ASSESSMENT TOOL 
        WILL HELP YOU THINK  THROUGH THESE QUESTIONS
    </div>

    <div class="item-4">
        YOUR RISK OF COMPLICATIONS WITH COVID-19 INFECTION
    </div>

    <div class="item-5">
        YOUR RISK OF BEING INFECTED WITH COVID-19 BASED ON YOUR RECENT CONTACTS
    </div>

    <button class="item-6" onclick="window.location.href='./assessment.html'">
         Start Assessment 
    </button>

    <div class="disclaimer">
    By clicking <b>Start Assessment</b>, you are acknowledging that: (1) You are 13-years or older;
    (2) You understand that this tool is an estimate and does not replace medical advice; and
    (3) You agree to the Terms of Use and Privacy Policy
    </div>
    <div class="privacy">
        <more style="font-size:larger" teaser='Terms of Use and Privacy Policy'> Work In Progress... </more> 
    </div>
</div>

</body>
</template>

<script>
import more from "./more";
export default {
  components: { more }
}
</script>

<style scoped>

body {
  max-height: 999999px;
  font-family: serif;
}


@media screen and (min-device-width: 1024px) {
  body {
    max-width: 60em;
    margin: auto;
  }
}


.container {
    display:grid;
    grid-template-columns: [first] 15rem 5rem 5rem [mid] 15rem 5rem [last] auto;
    grid-template-rows: 10px auto auto auto auto auto auto 10px;
    align-items: center;
    justify-items: center;
    font-family: sans-serif;
    margin:5px;
 }

.item-1, .item-2, .item-3 {
  border-radius: 15px;
  background: yellowgreen;
   /* #73AD21; */
  color:midnightblue;
  padding: 15px;
  padding-left: 20px;
  z-index: 5;
  font-weight: bold;
  grid-column-start: first;
  grid-column-end: first;
}

.item-1 {
  grid-row-start: 2;
  grid-row-end: 4;
  opacity: 1;
/*
  animation: cssAnimation 1s 2s forwards;
*/
}

.item-2, .item-3, .item-4, .item-5 {
  animation: cssAnimation ease 2s;
  visibility: visible;
}

.item-2 {
  grid-row-start: 4;
  grid-row-end: 6;
}

.item-3 {
  grid-row-start: 6;
  grid-row-end: 8;
}

.item-4, .item-5 {
  border-radius: 15px;
  background:royalblue;
   /* #73AD21; */
  color: white;
  padding: 20px;
  z-index: 5;
  font-weight: bold;
  grid-column-start: mid;
  grid-column-end: mid;
}


.item-4 {
   grid-row-start: 3;
   grid-row-end: 5;
}

.item-5 {
   grid-row-start: 5;
   grid-row-end: 7;
}

.item-6 {
    border-radius: 15px;
    border:grey;
    background: snow;
    padding: 20px;
    box-shadow: 15px 15px 10px gray;
    z-index: 5;

    cursor: pointer;
    color: black;
    font:larger;
    font-weight: bold;
    text-transform: uppercase;

    grid-column-start: 3;
    grid-column-end: 6;
    grid-row-start: 7;
    justify-self: stretch;  

    visibility: hidden;
    animation: cssAnimation 1s 2s forwards;
}



.item-6:hover, .item-6:focus {
    background: red;
    color:white;
    text-decoration: none;
}

.disclaimer {
    visibility:hidden;
    grid-column-start: 2;
    grid-column-end: last;
    grid-row-start: 10;
    z-index: 5;
    animation: cssAnimation 1s 2s forwards ease;
    visibility: hidden;
}

.item-6:hover + .disclaimer,
.item-6:focus + .disclaimer {
    color: red;
}

.privacy {
    grid-row-start:10;
    grid-column-start:first;
    margin: 10px
}

.privacy:hover {
    color: red
}

.picture {
    grid-column-start: first;
    grid-column-end: last;
    grid-row-start: 1;
    grid-row-end: 9;
    object-fit: cover;    
    z-index: 3;
 }

 @keyframes cssAnimation {
   0%   { opacity: 0;}
   to   { opacity: 1; visibility: visible;}
  }
</style>