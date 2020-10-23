<template functional>
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
        WHEN IS IT SAFE 
        TO GATHER?
        <br/>
        HOW CAN WE GATHER SAFELY WITH OTHERS?
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

    <div class="item-6">
        <a href="./assessment.html"> Start Assessment </a>
    </div>
</div>
</body>
</template>

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
    grid-template-columns: 15rem auto 15rem auto;
    grid-template-rows: 10px auto auto auto auto auto auto;
    align-items: center;
    justify-items: center;
    font-family: sans-serif;
    margin:5px;
 }

.item-1, .item-2, .item-3 {
  border-radius: 15px;
  background: yellowgreen;
   /* #73AD21; */
  padding: 20px;
  z-index: 5;
  font-weight: bold;
  grid-column-start: 1;
  grid-column-end: 1;
  opacity: 0;
}

.item-1 {
  grid-row-start: 2;
  grid-row-end: 4;
  animation: cssAnimation 1s 2s forwards;
}

.item-2 {
  grid-row-start: 4;
  grid-row-end: 6;
  animation: cssAnimation 2s 3s forwards;
}

.item-3 {
  grid-row-start: 6;
  grid-row-end: 8;
  animation: cssAnimation 4s 5s forwards;
}

.item-4, .item-5 {
  border-radius: 15px;
  background:royalblue;
   /* #73AD21; */
  color: white;
  padding: 20px;
  z-index: 5;
  font-weight: bold;
  grid-column-start: 3;
  grid-column-end: 3;
  opacity: 0;
}


.item-4 {
   grid-row-start: 3;
   grid-row-end: 5;
   animation: cssAnimation 5.5s 6s forwards;
}

.item-5 {
   grid-row-start: 5;
   grid-row-end: 7;
   animation: cssAnimation 7s 7.5s forwards;
}

.item-6 {
    border-radius: 15px;
    background: seashell;
    /* #73AD21; */
    padding: 20px;
    border:slategray;
    color: red;
    font:larger;
    cursor: pointer;
    z-index: 5;
    font-weight: bold;
    grid-column-start: 2;
    grid-column-end: 5;
/*
    justify-items: stretch;
    align-items: stretch;
    visibility: visible;
    float: left;
*/
    grid-row-start: 7;
    animation: cssAnimation 11s 12s forwards;
}

.picture {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 8;
    object-fit: cover;    
    z-index: 3;
 }

  @keyframes cssAnimation {
    to   { opacity: 1; visibility: visible;}
  }
</style>