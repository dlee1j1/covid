
import {amend, amendTuple} from "../shared.js"
export class HouseholdMemberData {
    constructor(index) {
        this.index = index,
            this.name = null,
            this.mask = null,
            this.socialdistance = null,
            this.relationship = null;
    }

    maskScore() {
        return this.mask == null ? 0 : this.mask[1];
    }

    sdScore() {
        return this.socialdistance == null ? 0 : this.socialdistance[1];
    }

    score() {
        return 12 * this.maskScore() * this.sdScore();
    }

    flatten(dict) {
        let prefix = `household_${this.index}`;
        amend(dict, prefix, 'relationship', this.relationship);
        amendTuple(dict, prefix, 'mask', this.mask);
        amendTuple(dict, prefix, 'socialdistance', this.socialdistance);
        amend(dict, prefix, 'score', this.score());
    }
}
