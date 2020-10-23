import Vue from 'vue'
import Intro from './components/Intro.vue'

var $app = new Vue({
  render: h => h(Intro),
})
$app.$mount('#app')
