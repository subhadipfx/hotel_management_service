import {Strategy,ExtractJwt, StrategyOptions } from 'passport-jwt'
import {User} from "../Modules/User/User";

export default class PassportStrategy {


    //describe your Strategies here

    public static JWTStrategy(){
        const opts:StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('token')]),
            secretOrKey: "secret"
        };
        return new Strategy(opts, (payload, done) =>{
            User.findOne({_id: payload.user_id})
                .then(user => {
                    if(user){
                        return done(null,user)
                    }else{
                        return done(null,false)
                    }
                })
                .catch(error => {
                    return done(error)
                })
        });
    }
}
