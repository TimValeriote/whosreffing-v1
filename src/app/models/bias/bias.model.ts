export class Bias {
    public name: string;
    public total: number;
    public horizontalPPs: number;
    public verticalPPs: number;
    public horizontalPercentage: number;
    public verticalPercentage: number;

    constructor();
    constructor(obj: Bias);
    constructor(obj?: any) {
        this.name = (obj && obj.name) || "";
        this.total = (obj && obj.total) || "";
        this.horizontalPPs = (obj && obj.horizontalPPs) || 0;
        this.verticalPPs = (obj && obj.verticalPPs) || 0;
        this.horizontalPercentage = (obj && obj.horizontalPercentage) || 0;
        this.verticalPercentage = (obj && obj.verticalPercentage) || 0;
    }
}