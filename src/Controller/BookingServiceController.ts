import {Request, Response} from "express";
import {ResponseMessage} from "../Utils/ResponseMessage";
import {HTTP_STATUS} from "../Utils/Response";
import {UserManager} from "../Modules/User/UserManager";
import {ServiceNotFoundException, UserNotFoundException} from "../Utils/Exceptions";
import {HotelServiceManager} from "../Modules/HotelService/HotelServiceManager";
import {BookingServiceManager} from "../Modules/BookingService/BookingServiceManager";

export class BookingServiceController {
    public static create(request: Request, response: Response): Response{
        const message = new ResponseMessage();

        if(!request.body.guest_id){
            message.addError("Invalid Guest");
        }
        if(!request.body.service_id){
            message.addError("Invalid Service");
        }

        if(!request.body.amount){
            message.addError("Invalid amount");
        }

        if(message.hasErrors()){
            return response.status(HTTP_STATUS.BAD_REQUEST).json(message);
        }

        const {guest_id, service_id, amount} = request.body;

        UserManager.instance().getUser(guest_id)
            .then(guest => {
                if(!guest) throw new UserNotFoundException();
                return [guest, HotelServiceManager.instance().get(service_id)]
            })
            .spread((guest, service) => {
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

    public static userBookings(request: Request, response: Response): Response {
        const message = new ResponseMessage();

        if(!request.query.guest_id){
            message.addError("Invalid Guest ID");
        }

        if(message.hasErrors()){
            return response.status(HTTP_STATUS.BAD_REQUEST).json(message);
        }

        const guest_id = String(request.query.guest_id);

        UserManager.instance().getUser(guest_id)
            .then(guest => {
                if(!guest) throw new UserNotFoundException();
               return BookingServiceManager.instance().list(guest)
            })
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
