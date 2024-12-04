export class Official {
    public first_name: string;
    public last_name: string;
    public official_type: string;
    public jersey_number: number;
    public total_games: number;

    constructor();
    constructor(obj: Official);
    constructor(obj?: any) {
        this.first_name = (obj && obj.first_name) || (obj && obj.first_name) || "";
        this.last_name = (obj && obj.last_name) || (obj && obj.last_name) || "";
        this.official_type = (obj && obj.official_type) || (obj && obj.official_type) || "";
        this.jersey_number = (obj && obj.jersey_number) || (obj && obj.jersey_number) || 0;
        this.total_games = (obj && obj.total_games) || 0;
    }
}