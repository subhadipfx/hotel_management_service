import {Schema, Types, model} from "mongoose";
import {INotificationService, NOTIFICATION_ALERT_TYPE} from "./Interfaces/INotificationService";

const NotificationServiceSchema: Schema = new Schema<INotificationService>({
    notify_to: {type: Types.ObjectId, required:true, ref:'User', index:true},
    alert_type: {type: String, default: NOTIFICATION_ALERT_TYPE.GENERAL},
    message: {type:String, required: true}
}, {
    timestamps: true
});


export const NotificationService = model<INotificationService>('NotificationService', NotificationServiceSchema);
