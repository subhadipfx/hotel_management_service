export enum HTTP_STATUS {
    SUCCESS = 200,
    SUCCESS_CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INTERNAL_ERROR= 500
}

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
