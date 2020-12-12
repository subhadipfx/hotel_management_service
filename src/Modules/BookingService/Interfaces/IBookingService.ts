import {Document, Types} from "mongoose";
import {IUser} from "../../User/Interfaces/IUser";
import {IHotelService} from "../../HotelService/Interfaces/IHotelService";

export enum BOOKING_STATUS {
    CONFIRMED= "CONFIRMED",
    CANCELED = "CANCELED",
    CHECK_IN = "CHECK_IN",
    CHECK_OUT = "CHECK_OUT",
    RATED = "RATED"
}

interface IBookingServiceBase {
    guest: (string | Types.ObjectId | IUser),
    service: (string | Types.ObjectId | IHotelService),
    bill_amount: number,
    status?: BOOKING_STATUS,
    rating?: number
}

export interface IBookingService extends IBookingServiceBase, Document {}

