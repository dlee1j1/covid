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

    <button class="item-6" onclick="window.location.href='./assessment.html'">
         Start Assessment 
    </button>

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
    grid-template-columns: [first] 15rem auto auto [mid] 15rem auto [last] auto;
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
  opacity: 0;
}

.item-1 {
  grid-row-start: 2;
  grid-row-end: 4;
  opacity: 1;
/*
  animation: cssAnimation 1s 2s forwards;
*/
}

.item-2 {
  grid-row-start: 4;
  grid-row-end: 6;
  animation: cssAnimation 1s 2s forwards;
}

.item-3 {
  grid-row-start: 6;
  grid-row-end: 8;
  animation: cssAnimation 3s 4s forwards;
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
  opacity: 0;
}


.item-4 {
   grid-row-start: 3;
   grid-row-end: 5;
   animation: cssAnimation 5s 6s forwards;
}

.item-5 {
   grid-row-start: 5;
   grid-row-end: 7;
   animation: cssAnimation 5s 6s forwards;
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
    animation: cssAnimation 8s 9s forwards;
}


.item-6:hover, .item-6:focus {
    background: red;
    color:white;
    text-decoration: none;
}

.picture {
    grid-column-start: first;
    grid-column-end: end;
    grid-row-start: 1;
    grid-row-end: 9;
    object-fit: cover;    
    z-index: 3;
 }

  @keyframes cssAnimation {
    to   { opacity: 1; visibility: visible;}
  }
</style>