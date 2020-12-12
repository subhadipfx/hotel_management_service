import BaseRouter from "./BaseRouter";
import {HotelServiceController} from "../Controller";
import {RoleManagement} from "../Middlewares/RoleManagement";
import {ImageUpload} from "../Middlewares/FileServiceMiddleware";
export class HotelServiceRouter extends BaseRouter{

    routes():void {
        this.router.get('/list', HotelServiceController.list);
        this.router.get('/:service_id', HotelServiceController.get);

        this.router.post('/',RoleManagement.isStaff ,ImageUpload.single('image') ,HotelServiceController.add);
        this.router.delete('/:service_id',  RoleManagement.isStaff ,HotelServiceController.remove);
    }

}
