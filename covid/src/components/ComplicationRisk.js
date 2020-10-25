import { amendTuple, amend } from "../shared.js"

export class ComplicationRisk {
    constructor(index) {
        this.index = index
        this.health = null
        this.age = null
    }

    healthscore() { return this.health ? this.health[1] : NaN }
    agescore() { return this.age ? this.age[1] : NaN }

    score() {
        if (this.agescore() == 0) { return 0 } 
        let t = this.healthscore() * this.agescore()
        return (t > 0 || isNaN(t)) ? t : null;
    }

    risk() {
        if (this.score() == null) return null;
        if (this.score() < 1) return "Very Low";
        if (this.score() < 3) return "Low";
        if (this.score() <= 5) return "Medium";
        if (this.score() > 5) return "High";
        return null
    }

    flatten(dict) {
        let prefix = this.index
        amendTuple(dict, prefix, 'health', this.health)
        amendTuple(dict, prefix, 'age', this.age)
        amend(dict, prefix, 'score', this.score())
        amend(dict, prefix, 'risk', this.risk())
    }
}