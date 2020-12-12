import {Request, Response} from "express";
import {ResponseMessage} from "../Utils/ResponseMessage";
import {HTTP_STATUS} from "../Utils/ResponseMessage";
import {ServiceNotFoundException} from "../Utils/Exceptions";
import {HotelServiceManager} from "../Modules/HotelService/HotelServiceManager";
import {BookingServiceManager} from "../Modules/BookingService/BookingServiceManager";

export class BookingServiceController {
    public static create(request: Request, response: Response): Response{
        const message = new ResponseMessage();

        if(!request.body.service_id){
            message.addError("Invalid Service");
        }

        if(!request.body.amount){
            message.addError("Invalid amount");
        }

        if(message.hasErrors()){
            return response.status(HTTP_STATUS.BAD_REQUEST).json(message);
        }

        const {service_id, amount} = request.body;
        const guest:any = request.user;
        HotelServiceManager.instance().get(service_id)
            .then(( service) => {
                if(!service) throw new ServiceNotFoundException();
                return BookingServiceManager.instance().create(guest, service, amount)
            })
            .then(data => {
                message.addResponse("Booking created successfully", data)
                return response.status(HTTP_STATUS.SUCCESS_CREATED).json(message);
            })
            .catch(error => response.status(HTTP_STATUS.BAD_REQUEST).json(error))
    }

    public static updateStatus(request: Request, response: Response): Response {
        const message = new ResponseMessage();

        if(!request.body.booking_id){
            message.addError("Invalid Booking ID");
        }

        if(!request.body.status){
            message.addError("Invalid Status");
        }

        if(message.hasErrors()){
            return response.status(HTTP_STATUS.BAD_REQUEST).json(message);
        }
        const {booking_id , status } = request.body;
        BookingServiceManager.instance().updateStatus(booking_id, status)
            .then(data => {
                message.addResponse("Status updated successfully", data)
                return response.status(HTTP_STATUS.SUCCESS).json(message);
            })
            .catch(error => response.status(HTTP_STATUS.BAD_REQUEST).json(error))
    }

    public static allBookings(request: Request, response: Response): Response {
        const message = new ResponseMessage();
        let from_date = null,to_date = null;

        if(request.query.from_date){
            from_date = String(request.query.from_date);
        }
        if(request.query.to_date){
            to_date = String(request.query.to_date);
        }

        BookingServiceManager.instance().list(null,from_date,to_date)
            .then(data => {
                message.addResponse("List fetched successfully", data)
                return response.status(HTTP_STATUS.SUCCESS).json(message);
            })
            .catch(error => response.status(HTTP_STATUS.BAD_REQUEST).json(error))
        return ;
    }

    public static userBookings(request: Request, response: Response) {
        const message = new ResponseMessage();

        const guest:any = request.user;

        BookingServiceManager.instance().list(guest)
            .then(data => {
                message.addResponse("List fetched successfully", data)
                return response.status(HTTP_STATUS.SUCCESS).json(message);
            })
            .catch(error => response.status(HTTP_STATUS.BAD_REQUEST).json(error))
    }

    public static rateBooking(request: Request, response: Response): Response {
        const message = new ResponseMessage();

        if(!request.body.booking_id){
            message.addError("Invalid Booking ID");
        }

        if(!request.body.rating){
            message.addError("Invalid Rating");
        }
        if(request.body.rating < 0 || request.body.rating > 5){
            message.addError(`Rating value ${request.body.rating} is invalid. Possible rating values are 0,1,2,3,4,5`);
        }

        if(message.hasErrors()){
            return response.status(HTTP_STATUS.BAD_REQUEST).json(message);
        }

        const {booking_id, rating} = request.body;

        BookingServiceManager.instance().rateBooking(booking_id,rating)
            .then(data => {
                message.addResponse("Rating submitted successfully", data)
                return response.status(HTTP_STATUS.SUCCESS).json(message);
            })
            .catch(error => response.status(HTTP_STATUS.BAD_REQUEST).json(error))
    }
}
