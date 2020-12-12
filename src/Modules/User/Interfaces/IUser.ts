import {Document} from "mongoose";

export enum USER_ROLE {
    GUEST = "GUEST",
    STAFF = "STAFF",
    OWNER = "OWNER"
}

interface IUserBase {
    name: string,
    email:string,
    password: string
    role?: USER_ROLE,
}


export interface IUser extends IUserBase, Document {
    authenticate(password:string):Promise<any>
    getToken():string
}
