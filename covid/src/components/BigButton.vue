<template>
        <button class=big-button v-on="$listeners">
            <slot/>
        </button>
</template>

<style scoped>

.big-button:hover, .big-button:focus {
    background:lightgray;
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
}

</style>



