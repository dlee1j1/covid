<template>
  <DictSelect
    v-model="selectedOption"
    @input="$emit('input', selectedOption)"
    :dict="BehaviorDict"
    :value="value"
  >
  </DictSelect>
</template>

<script>
import DictSelect from './DictSelect.vue'
export default {
    props: ['value','hasunknown'],
    created() {
            let BehaviorDict = {
                'All of the time':0.5,
                'Half of the time or more':0.75,
                'Less than half of the time': 1,
            } 
            if (this.hasunknown) {  Object.assign(BehaviorDict, {'Do not know':1 }) }
            this.BehaviorDict = BehaviorDict
        },
    data() { 
            return { selectedOption: this.value}
        },
    components: {
        DictSelect
    }    
}
</script>
