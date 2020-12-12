import {NotificationServiceEmitter} from "./Emitters/NotificationServiceEmitter";

export class BaseEventHandler {
    public static register() {
        //add all your listeners here
        new NotificationServiceEmitter().associateListeners();
    }
}
