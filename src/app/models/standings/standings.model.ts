import { Official } from "../official/official.model";
export class Standings {
    public league_name: string;
    public officials: Official[];

    constructor();
    constructor(obj: Standings);
    constructor(obj?: any) {
        this.league_name = (obj && obj.league_name) || (obj && obj.league_name) || "";
        this.officials = (obj && obj.officials) || [];
    }
}
