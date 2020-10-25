<template>
    <div class=container>
        <button class=big-button v-on="$listeners">
            <slot/>
        </button>
    </div>
</template>

<style scoped>

.container {
    width:100%;
    display:flex;
    justify-content: center;
}

.big-button:hover, .big-button:focus {
    background:lightseagreen;
    color:white;
}

.big-button {
    border-radius: 15px;
    border:1px solid lightgrey;
    background: snow;
    padding: 12px 50px;
    box-shadow: -5px -5px 5px gray inset;
    font-family: sans-serif;
    margin-top: 5px;
    cursor: pointer;
    color: black;
    font-size:larger;
    font-weight: bold;
    text-transform: capitalize;

    justify-self: stretch;     
}

</style>



