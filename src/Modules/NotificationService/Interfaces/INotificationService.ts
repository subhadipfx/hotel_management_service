import {Document, Types} from "mongoose";
import {IUser} from "../../User/Interfaces/IUser";

export enum NOTIFICATION_ALERT_TYPE {
    GENERAL= "GENERAL",
    WARNING = "WARNING",
    ERROR = "ERROR"
}


interface INotificationServiceBase {
    notify_to: (string | Types.ObjectId | IUser ),
    alert_Type : NOTIFICATION_ALERT_TYPE,
    message: string
}

export interface INotificationService extends INotificationServiceBase, Document {}
