import {Request, Response} from "express";
import {ResponseMessage} from "../Utils/ResponseMessage";
import {HTTP_STATUS} from "../Utils/Response";
import {UserManager} from "../Modules/User/UserManager";
import {USER_ROLE} from "../Modules/User/Interfaces/IUser";

export class UserController {

    public static create(request: Request, response: Response){

        const message = new ResponseMessage();
        if(!request.body.name){
            message.addError("Invalid Name");
        }
        if(!request.body.email){
            message.addError("Invalid email");
        }
        if(!request.body.password){
            message.addError("Invalid Password");
        }

        if(message.hasErrors()){
            return response.status(HTTP_STATUS.BAD_REQUEST).json(message);
        }

        const {name, email, password} = request.body;

        UserManager.instance().create(name, email, password)
            .then(data => {
                message.addResponse("User Created Successfully", data)
                return response.status(HTTP_STATUS.SUCCESS_CREATED).json(message);
            })
            .catch(error => response.status(HTTP_STATUS.BAD_REQUEST).json(error))
    }

    public static authenticate(request: Request, response: Response){
        const message = new ResponseMessage();

        if(!request.body.email){
            message.addError("Invalid email");
        }
        if(!request.body.password){
            message.addError("Invalid Password");
        }

        if(message.hasErrors()){
            return response.status(HTTP_STATUS.BAD_REQUEST).json(message);
        }

        const {email, password} = request.body;
        UserManager.instance().authenticate(email, password)
            .then(data => {
                message.addResponse("User Authenticated Successfully", data)
                return response.status(HTTP_STATUS.SUCCESS_CREATED).json(message);
            })
            .catch(error => response.status(HTTP_STATUS.BAD_REQUEST).json(error))
    }

    public static currentUser(request: Request, response: Response){
        const message = new ResponseMessage();

        if(!request.user){
            message.addError("Invalid user token")
        }

        if(message.hasErrors()){
            return response.status(HTTP_STATUS.BAD_REQUEST).json(message);
        }
        message.addResponse("User fetched successfully", request.user);
        return response.status(HTTP_STATUS.SUCCESS).json(message);
    }

    public static assignRole(request: Request, response: Response){
        const message = new ResponseMessage();

        if(!request.body.user_id){
            message.addError("Invalid User ID");
        }
        if(!request.body.role){
            message.addError("Invalid User Role");
        }

        if(message.hasErrors()){
            return response.status(HTTP_STATUS.BAD_REQUEST).json(message);
        }

        const {user_id , role} = request.body;

        UserManager.instance().assignRole(user_id, role)
            .then( _ => {
                message.addResponse("Role Updated Successfully")
                return response.status(HTTP_STATUS.SUCCESS).json(message);
            })
            .catch(error => response.status(HTTP_STATUS.BAD_REQUEST).json(error))

    }
}
