
import Vue from 'vue'

Vue.filter('decimal',
function(val) { 
    if (!val) return val
    return Math.round(val*1000)/1000 
 })

Vue.filter('keycheck',
function(tuple) {        
    return tuple ? tuple[0] : null
})