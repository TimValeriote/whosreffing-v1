export class User {
    public userId: string;
    public userEmail: string;
    public firstName: string;
    public lastName: string;
    public userType: string;

    constructor();
    constructor(obj: User);
    constructor(obj?: any) {
        this.userId = (obj && obj.userId) || (obj && obj.userId) || "";
        this.userEmail = (obj && obj.userEmail) || (obj && obj.userEmail) || "";
        this.firstName = (obj && obj.firstName) || (obj && obj.firstName) || "";
        this.lastName = (obj && obj.lastName) || (obj && obj.lastName) || "";
        this.userType = (obj && obj.userType) || (obj && obj.userType) || "";
    }
}
