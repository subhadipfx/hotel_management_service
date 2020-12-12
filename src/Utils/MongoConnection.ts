import {connect, set} from "mongoose"

const DB_URI = "mongodb+srv://agentfx:agentfx@cluster0.z0i43.mongodb.net/hotel_management_d?retryWrites=true&w=majority"


export default class MongoConnection{
    public static connect(){
        set('useCreateIndex', true);
        set('debug', true)
        return connect(DB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    }
}
