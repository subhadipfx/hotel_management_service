import {Request, Response} from "express";
import {ResponseMessage} from "../Utils/ResponseMessage";
import {HTTP_STATUS} from "../Utils/Response";
import {HotelServiceManager} from "../Modules/HotelService/HotelServiceManager";

export class HotelServiceController {

    public static add(request: Request, response: Response){
        const message = new ResponseMessage();

        if(!request.body.service_type){
            message.addError("Invalid Service Type");
        }
        if(!request.body.description){
            message.addError("Invalid description");
        }

        if(!request.body.price){
            message.addError("Invalid price");
        }

        if(!request.body.discount){
            message.addError("Invalid discount");
        }


        if(message.hasErrors()){
            return response.status(HTTP_STATUS.BAD_REQUEST).json(message);
        }

        const {service_type, description, price, discount} = request.body;
        const addedBy = request.user;
        const imageURL = request.file.path;

        HotelServiceManager.instance().add(service_type, description, imageURL, parseInt(price), parseInt(discount), addedBy)
            .then(data => {
                message.addResponse("Service added successfully", data)
                return response.status(HTTP_STATUS.SUCCESS_CREATED).json(message);
            })
            .catch(error => response.status(HTTP_STATUS.INTERNAL_ERROR).json(error))

    }

    public static get(request: Request, response: Response){
        const message = new ResponseMessage();

        if(!request.params.service_id){
            message.addError("Invalid Service ID");
        }

        if(message.hasErrors()){
            return response.status(HTTP_STATUS.BAD_REQUEST).json(message);
        }

        const service_id = request.params.service_id;
        HotelServiceManager.instance().get(service_id)
            .then(data => {
                message.addResponse("Service found successfully", data)
                return response.status(HTTP_STATUS.SUCCESS).json(message);
            })
            .catch(error => response.status(HTTP_STATUS.INTERNAL_ERROR).json(error))
    }

    public static list(request: Request, response: Response){
        const message = new ResponseMessage();

        let service_type = null;
        if(request.query.service_type){
            service_type = String(request.query.service_type);
        }

        HotelServiceManager.instance().list(service_type)
            .then(data => {
                message.addResponse("Service List fetched successfully", {count:data.length, data})
                return response.status(HTTP_STATUS.SUCCESS).json(message);
            })
            .catch(error => response.status(HTTP_STATUS.INTERNAL_ERROR).json(error))
    }

    public static remove(request: Request, response: Response){
        const message = new ResponseMessage();

        if(!request.params.service_id){
            message.addError("Invalid Service ID");
        }


        if(message.hasErrors()){
            return response.status(HTTP_STATUS.BAD_REQUEST).json(message);
        }
        const service_id = request.params.service_id;
        HotelServiceManager.instance().remove(service_id)
            .then(_ => {
                message.addResponse("Service deleted successfully")
                return response.status(HTTP_STATUS.SUCCESS).json(message);
            })
            .catch(error => response.status(HTTP_STATUS.INTERNAL_ERROR).json(error))
    }
}
