export class Team {
    public city: string;
    public code: number;
    public name: string;
    public nickname: string;

    constructor();
    constructor(obj: Team);
    constructor(obj?: any) {
        this.city = (obj && obj.city) || "";
        this.code = (obj && obj.code) || 0;
        this.name = (obj && obj.name) || "";
        this.nickname = (obj && obj.nickname) || "";
    }
}