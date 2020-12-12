import {Request, Response, NextFunction} from "express"
import {USER_ROLE} from "../Modules/User/Interfaces/IUser";
import {HTTP_STATUS} from "../Utils/Response";

export class RoleManagement {

    public static isOwner(request:Request, response:Response, next:NextFunction){
        const loggedUser:any = request.user;
        if(loggedUser.role != USER_ROLE.OWNER){
            return response.status(HTTP_STATUS.UNAUTHORIZED).send("Only Owner has access to this");
        }
        next();
    }

    public static isStaff(request:Request, response:Response, next:NextFunction){
        const loggedUser:any = request.user;
        // console.log("here role")
        // console.log(request.body);
        if(loggedUser.role != USER_ROLE.STAFF && loggedUser.role != USER_ROLE.OWNER){
            return response.status(HTTP_STATUS.UNAUTHORIZED).send("Only staffs has access to this");
        }
        next();
    }

    public static isGuest(request:Request, response:Response, next:NextFunction){
        const loggedUser:any = request.user;
        if(loggedUser.role != USER_ROLE.GUEST){
            return response.status(HTTP_STATUS.UNAUTHORIZED).send("Only Guests has access to this");
        }
        next();
    }

}
