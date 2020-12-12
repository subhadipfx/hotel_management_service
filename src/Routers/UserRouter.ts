import {authenticate} from "passport";
import BaseRouter from "./BaseRouter";
import {UserController} from "../Controller"
import {RoleManagement} from "../Middlewares/RoleManagement";
export class UserRouter extends BaseRouter{
    routes():void {

        this.router.post('/',UserController.create);
        this.router.post('/authenticate',UserController.authenticate);

        //after this all routes need to be authenticated first
        this.router.use(authenticate("jwt", { session: false }))
        this.router.get('/me', UserController.currentUser);
        this.router.put('/assign-role',RoleManagement.isOwner,UserController.assignRole);
    }
}
