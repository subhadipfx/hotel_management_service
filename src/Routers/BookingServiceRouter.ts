import BaseRouter from "./BaseRouter";
import {BookingServiceController} from "../Controller";
import {RoleManagement} from "../Middlewares/RoleManagement";

export class BookingServiceRouter extends BaseRouter{
    routes():void{
        this.router.get('/', RoleManagement.isGuest,BookingServiceController.userBookings);
        this.router.post('/', RoleManagement.isGuest,BookingServiceController.create);
        this.router.get('/bookings', RoleManagement.isStaff ,BookingServiceController.allBookings);
        this.router.put('/status', RoleManagement.isStaff, BookingServiceController.updateStatus);
        this.router.put('/rating', RoleManagement.isGuest, BookingServiceController.rateBooking);
    }
}
