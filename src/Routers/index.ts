import BaseRouter from "./BaseRouter";
import {UserRouter} from "./UserRouter";
import {HotelServiceRouter} from "./HotelServiceRouter";
import {BookingServiceRouter} from "./BookingServiceRouter";
import {authenticate} from "passport";

export class IndexRouter extends BaseRouter {
    routes():void {
        this.router.use('/user',new UserRouter().associate());
        this.router.use('/hotel-service',authenticate("jwt", { session: false }), new HotelServiceRouter().associate())
        this.router.use('/booking-service', authenticate("jwt", { session: false }), new BookingServiceRouter().associate());
    }
}
