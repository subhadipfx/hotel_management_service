import * as q from "q";
import {BookingServiceManager} from "../../Modules/BookingService/BookingServiceManager";
import {BookingNotFoundException} from "../../Utils/Exceptions";
import {NotificationServiceManager} from "../../Modules/NotificationService/NotificationServiceManager";

export class NotificationServiceListeners {
   public static handleBookingStatus(bookingID) {
       console.log("inside handlers")
        const defer = q.defer();
        BookingServiceManager.instance().get(bookingID)
            .then(booking => {
                if(!booking) throw new BookingNotFoundException();
                return NotificationServiceManager.instance().sendBookingStatusNotification(booking);
            })
            .then(_ => defer.resolve())
            .catch(error => defer.reject(error))
        return defer.promise;
    }
}
