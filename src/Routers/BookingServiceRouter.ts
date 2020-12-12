import BaseRouter from "./BaseRouter";
import {BookingServiceController} from "../Controller";
import {RoleManagement} from "../Middlewares/RoleManagement";

export class BookingServiceRouter extends BaseRouter{
    routes():void{
        this.router.post('/', RoleManagement.isGuest,BookingServiceController.create);
        this.router.get('/list', RoleManagement.isStaff ,BookingServiceController.allBookings);
        this.router.put('/status', RoleManagement.isStaff, BookingServiceController.updateStatus);
        this.router.put('/rating', RoleManagement.isGuest, BookingServiceController.rateBooking);
        this.router.get('/guest/:guest_id', RoleManagement.isGuest,BookingServiceController.userBookings);
    }
}
