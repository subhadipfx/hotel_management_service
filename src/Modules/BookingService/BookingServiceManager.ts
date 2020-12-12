import * as q from "q";
import * as moment from "moment";
import {BOOKING_STATUS, IBookingService} from "./Interfaces/IBookingService";
import {IUser} from "../User/Interfaces/IUser";
import {IHotelService} from "../HotelService/Interfaces/IHotelService";
import {BookingService} from "./BookingService";
import {
    BookingNotFoundException,
    InvalidBookingStatusException,
    InvalidRatingException,
    NotCheckedOutException
} from "../../Utils/Exceptions";

export class BookingServiceManager {
    private static $_instance:BookingServiceManager = null;

    private constructor() {
    }

    public static instance():BookingServiceManager{
        if(!BookingServiceManager.$_instance){
            BookingServiceManager.$_instance = new BookingServiceManager();
        }

        return BookingServiceManager.$_instance;
    }

    create(guest:IUser, service:IHotelService, bill_amount: number){
        const defer = q.defer<IBookingService>();
        BookingService.create({
            guest,
            service,
            bill_amount
        })
            .then(booking => defer.resolve(booking))
            .catch(error => defer.reject(error))
        return defer.promise;
    }

    updateStatus(booking_id:string, status:BOOKING_STATUS):q.Promise<IBookingService>{
        const defer = q.defer<IBookingService>();
        this.get(booking_id)
            .then(booking => {
                if(booking.status == BOOKING_STATUS.CONFIRMED && (status == BOOKING_STATUS.CHECK_IN || status == BOOKING_STATUS.CANCELED)){
                    booking.status = status;
                }else if(booking.status == BOOKING_STATUS.CHECK_IN && status == BOOKING_STATUS.CHECK_OUT){
                    booking.status = status;
                }else{
                    throw new InvalidBookingStatusException();
                }
                return booking.save();
            })
            .then(booking => defer.resolve(booking))
            .catch(error => defer.reject(error));
        return defer.promise;
    }

    get(booking_id):q.Promise<IBookingService>{
        const defer = q.defer<IBookingService>();
        BookingService.findById(booking_id)
            .exec()
            .then(booking => {
                if(!booking) throw new BookingNotFoundException();
                defer.resolve(booking);
            })
            .catch(error => defer.reject(error));
            return defer.promise;
    }

    list(guest: IUser = null, from_date = null, to_date = null):q.Promise<IBookingService[]>{
        const defer = q.defer<IBookingService[]>();
        let query = {},dateQuery = {};

        if(guest) query["guest"] =  guest;

        if(from_date) dateQuery["$gte"] = moment(from_date).toDate();

        if(to_date) dateQuery["$lte"] = moment(to_date).toDate();

        if(from_date || to_date) query["createdAt"] = dateQuery;


        BookingService.find(query)
            .exec()
            .then(bookings => defer.resolve(bookings))
            .catch(error => defer.reject(error));
        return defer.promise;
    }

    rateBooking(booking_id: string, rating: number):q.Promise<IBookingService>{
        const defer = q.defer<IBookingService>();
        this.get(booking_id)
            .then(booking => {
                if(booking.status != BOOKING_STATUS.CHECK_OUT) throw new NotCheckedOutException();
                if(rating < 0 || rating > 5) throw new InvalidRatingException();
                booking.rating = rating;
                return booking.save();
            })
            .then(booking => defer.resolve(booking))
            .catch(error => defer.reject(error));
        return defer.promise;
    }
}
