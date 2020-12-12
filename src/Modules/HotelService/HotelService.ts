import {Schema, model, Types} from "mongoose";
import {IHotelService, SERVICE_TYPE} from "./Interfaces/IHotelService";


const HotelServiceSchema:Schema = new Schema<IHotelService>({
    service_type: {type:String, required: true},
    added_by: {type: Types.ObjectId, required:true, ref:'User'},
    description: {type:String, required:true},
    image: String,
    price: {type: Number, required:true},
    discount: {type:Number, default:0}
}, {    
    timestamps: true
});

HotelServiceSchema.virtual('discounted_price').get(function (){
    return (this.price * (this.discount / 100));
});


export const HotelService = model<IHotelService>('HotelService', HotelServiceSchema)
