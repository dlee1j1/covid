import { amend,amendTuple } from "../shared.js"

export class ContactScoreData {
    constructor(index,prompt) {
        this.index = index
        this.mask = null
        this.socialdistance = null
        this.smallroom = null
        this.count = null
        this.frequency = null
        this.prompt = prompt?prompt:`at ${index}`
    }

    maskScore() {
         return this.mask == null?NaN:this.mask[1];
    }

    sdScore() {
         return this.socialdistance == null?NaN:this.socialdistance[1];
    }

    smallroomScore() {
        if (this.index == 'outside') { return 1}
        return this.smallroom == null?NaN:this.smallroom[1];
    }

    frequencyScore() {
        return this.frequency == null?NaN:this.frequency[1];
    }

    score() {
        if (this.count == null) { return NaN }
        if (this.count == 0) { return 0}
        return this.count*this.maskScore()*this.sdScore()*this.smallroomScore()*this.frequencyScore();
    }

    flatten(dict) {
        let prefix = this.index
        amendTuple(dict,prefix,'mask',this.mask)
        amendTuple(dict,prefix,'socialdistance',this.socialdistance)
        amendTuple(dict,prefix,'smallroom',this.smallroom)
        amendTuple(dict,prefix,'frequency',this.frequency)
        amend(dict,prefix,'score',this.score())
        amend(dict,prefix,'count',this.count)
    }
}  
