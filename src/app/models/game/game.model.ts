import { Team } from "../team/team.model";
import { Official } from "../official/official.model";

export class Game {
    public date: any;
    public id: number;
    public home_team: Team;
    public visiting_team: Team;
    public officials: Official[];
    public venue: string;
    public status: number;
    public game_sheet_url: string;
    public game_number: number;
    public is_playoff: number;

    constructor();
    constructor(obj: Team);
    constructor(obj?: any) {
        this.date = (obj && obj.date) || "";
        this.id = (obj && obj.id) || (obj && obj.game_id) || 0;
        this.home_team = (obj && obj.home_team);
        this.visiting_team = (obj && obj.visiting_team);
        this.officials = (obj && obj.officials) || [];
        this.venue = (obj && obj.venue) || "";
        this.status = (obj && obj.status) || 0;
        this.game_sheet_url = (obj && obj.game_sheet_url) || "";
        this.game_number = (obj && obj.game_number) || "";
        this.is_playoff = (obj && obj.is_playoff) || "";
    }
}