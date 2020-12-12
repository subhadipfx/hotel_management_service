import {Document, Types} from "mongoose";
import {IUser} from "../../User/Interfaces/IUser";

export enum SERVICE_TYPE {
    MEETING_ROOMS = "MEETING ROOMS",
    DINING = "DINING",
    LIVE_EVENT_BOOKINGS = "LIVE EVENT BOOKINGS",
    ROOM_UPGRADE = "ROOM UPGRADE",
    CAR_RENTAL = "CAR RENTAL"
}


interface IHotelServiceBase {
    service_type: SERVICE_TYPE,
    added_by: (string | Types.ObjectId | IUser)
    description: string,
    image: string,
    price: number,
    discount: number
}

export interface IHotelService extends IHotelServiceBase, Document {}
