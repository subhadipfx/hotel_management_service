import {HTTP_STATUS} from "./Response";

export class ResponseMessage{
    private  message = null;
    private  data = null;
    private errors = [];
    constructor() {
    }

    addError(errorMSG: string){
        this.errors.push(errorMSG);
    }

    addResponse(message: string, data:any = null){
        this.message = message;
        this.data = data;
    }

    hasErrors(){
        return this.errors.length;
    }

    toJSON(){
        if(this.errors.length)

            return { errors: this.errors }

        else

            return {
                message: this.message,
                data: this.data
            }

    }
}
