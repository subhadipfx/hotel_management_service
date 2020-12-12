import {EventEmitter} from "events";
import {NotificationServiceListeners} from "../Listeners/NotificationServiceListeners";

export class NotificationServiceEmitter extends EventEmitter {

    associateListeners(): void{
        console.log(this.listeners('bookingStatus'))
        //register all your handlers here
        new EventEmitter().on('bookingStatus', () => {
            console.log("ed")
        });
    }

    emitBookingStatus(bookingID):void{
        console.log("generating event");
        console.log("booking id", bookingID);
        this.emit('bookingStatus', bookingID)
    }
}

