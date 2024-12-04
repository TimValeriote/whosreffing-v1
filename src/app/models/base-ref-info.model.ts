export class BaseRefInfo {
    public name: string;
    public games_worked: number;

    constructor();
    constructor(obj: BaseRefInfo);
    constructor(obj?: any) {
        this.name = (obj && obj.name) || (obj && obj.name) || "";
        this.games_worked = (obj && obj.games_worked) || (obj && obj.games_worked) || 0;
    }
}
