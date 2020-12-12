import {Schema, model} from "mongoose";
import * as q from "q";
import {compareSync, hashSync} from "bcrypt";
import * as jwt from "jsonwebtoken";

import {IUser, USER_ROLE} from "./Interfaces/IUser";
import {HASH_SALT_ROUNDS, JWT_SECRET, TOKEN_EXPIRY} from "../../Utils/Config";
import {InvalidCredentialsException} from "../../Utils/Exceptions";



const UserSchema: Schema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase:true},
    role: {type:String, default: USER_ROLE.GUEST},
    password: {type:String, required: true}
},
    {
        timestamps: true
    });

UserSchema.set('toJSON', {
    transform: function (doc, user, options) {
        delete user.password;
        return user;
    }
});

UserSchema.pre('save',  function (next) {
    if(this.isModified('password')){
        // @ts-ignore
        this.password = hashSync(this.get('password'), HASH_SALT_ROUNDS);
    }
    next();
});


UserSchema.methods.authenticate = function (password: string):q.Promise<any> {
    let defer:q.Deferred<any> = q.defer<any>();
    const user = this;
    const hashed_password = user.password;

    if (compareSync(password, hashed_password)) {

        const options: any = { expiresIn: TOKEN_EXPIRY };
        const token = jwt.sign({ user_id: user.id }, JWT_SECRET, options);

        user.save()
            .then(_ => defer.resolve({id : user.id,token}))
            .catch(error => {
                console.log(error)
                defer.reject(error)
            });

    }
    else defer.reject(new InvalidCredentialsException());

    return defer.promise;
};

UserSchema.methods.getToken = function ():string {
    const options: any = { expiresIn: TOKEN_EXPIRY };
    return  jwt.sign({ user_id: this.id }, JWT_SECRET, options);
};


export const User = model<IUser>('User', UserSchema);
