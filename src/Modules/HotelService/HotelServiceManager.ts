import * as q from "q";
import {IHotelService, SERVICE_TYPE} from "./Interfaces/IHotelService";
import {HotelService} from "./HotelService";
import {IUser} from "../User/Interfaces/IUser";
import {ServiceNotFoundException} from "../../Utils/Exceptions";

export class HotelServiceManager {
    private static $_instance:HotelServiceManager = null;
    private constructor() {
    }

    public static instance():HotelServiceManager{

        if(!HotelServiceManager.$_instance){
            HotelServiceManager.$_instance = new HotelServiceManager();
        }

        return HotelServiceManager.$_instance;
    }

    add(service_type: SERVICE_TYPE, description: string, image:string, price:number, discount: number, added_by: any):q.Promise<IHotelService>{
        const defer:q.Deferred<IHotelService> = q.defer<IHotelService>();
        HotelService.create({
            service_type,
            description,
            image,
            price,
            discount,
            added_by
        })
            .then(service => defer.resolve(service))
            .catch(error => defer.reject(error));
        return defer.promise;
    }

    get(service_id):q.Promise<IHotelService>{
        const defer = q.defer<IHotelService>();
        HotelService.findById(service_id)
            .exec()
            .then(service => {
                if(!service) throw new ServiceNotFoundException();
                defer.resolve(service);
            })
            .catch(error => defer.reject(error))

        return defer.promise;

    }

    list(service_type: SERVICE_TYPE = null):q.Promise<IHotelService[]>{
        const defer = q.defer<IHotelService[]>();
        let query = {};
        if(service_type) query = {service_type}
        HotelService.find(query)
            .exec()
            .then(services => defer.resolve(services))
            .catch(error => defer.reject(error))

        return defer.promise;
    }



    remove(service_id:string):q.Promise<void>{
        const defer = q.defer<void>()
        HotelService.deleteOne({_id: service_id})
            .exec()
            .then(_ => defer.resolve())
            .catch(error => defer.reject(error))

        return defer.promise;
    }


}
