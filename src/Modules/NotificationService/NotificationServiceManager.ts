import * as q from "q";
import {IBookingService} from "../BookingService/Interfaces/IBookingService";
import {INotificationService, NOTIFICATION_ALERT_TYPE} from "./Interfaces/INotificationService";
import {NotificationService} from "./NotificationService";

export class NotificationServiceManager {
    private static $_instance:NotificationServiceManager = null;
    private constructor() {
    }
    public static instance():NotificationServiceManager{
        if(!NotificationServiceManager.$_instance){
            NotificationServiceManager.$_instance = new NotificationServiceManager();
        }
        return NotificationServiceManager.$_instance;
    }

    private processNotification(notification): Promise<any>{
        const channel = process.env.NOTIFICATION_CHANNEL || "DB";
        let promise = null;
        switch (channel){
            case "DB":
                promise = NotificationService.create(notification);
                break;
            default:
                console.log("Invalid notification channel")
        }

        return promise;
    }

    sendBookingStatusNotification(booking: IBookingService){
        const defer = q.defer();
        const message = `Your booking with Booking ID ${booking._id} is updated`;
        const notification = {
            notify_to: booking.guest,
            message,
            alert_Type: NOTIFICATION_ALERT_TYPE.GENERAL
        }
        this.processNotification(notification)
            .then( _ => defer.resolve())
            .catch(error => defer.reject(error));
    }
}
