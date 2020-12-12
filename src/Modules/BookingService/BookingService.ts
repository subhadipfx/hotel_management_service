import {Schema, model, Types} from "mongoose";
import {BOOKING_STATUS, IBookingService} from "./Interfaces/IBookingService";

const BookingServiceSchema: Schema = new Schema<IBookingService>({
    guest: {type: Types.ObjectId, required: true , ref: 'User'},
    service: {type: Types.ObjectId, required: true , ref: 'HotelService'},
    bill_amount: {type: Number, required: true},
    status: {type: String, required: true, default: BOOKING_STATUS.CONFIRMED},
    rating: Number
}, {
    timestamps: true
})

export const BookingService = model<IBookingService>('BookingService', BookingServiceSchema);
