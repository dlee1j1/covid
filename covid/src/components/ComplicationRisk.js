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

    vaccine_score() {
        return this.score()*0.10;
    }

    compute_risk(score) {
        if (score == null) return null;
        if (score < 1) return "Very Low";
        if (score < 3) return "Low";
        if (score <= 5) return "Medium";
        if (score > 5) return "High";
        return null
    }

    risk() {
        return this.compute_risk(this.score());
    }

    vaccine_risk() {
        return this.compute_risk(this.vaccine_score());        
    }

    flatten(dict) {
        let prefix = this.index
        amendTuple(dict, prefix, 'health', this.health)
        amendTuple(dict, prefix, 'age', this.age)
        amend(dict, prefix, 'score', this.score())
        amend(dict, prefix, 'risk', this.risk())
    }
}