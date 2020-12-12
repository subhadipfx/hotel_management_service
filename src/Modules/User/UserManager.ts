import * as q from "q";
import {IUser, USER_ROLE} from "./Interfaces/IUser";
import {User} from "./User";
import {UserAlreadyExistsException, UserNotFoundException} from "../../Utils/Exceptions";

export class UserManager{
    private static $_instance:UserManager = null;

    private constructor() {
    }

    public static instance():UserManager{
        if(!UserManager.$_instance) UserManager.$_instance = new UserManager();
        return UserManager.$_instance;
    }

    create(name:string, email:string, password:string):q.Promise<{user_id: string, token: string}>{
        const defer = q.defer<any>();
        User.findOne({email:email})
            .exec()
            .then(user => {
                if(user) throw new UserAlreadyExistsException();
                return User.create({
                    name,
                    email,
                    password
                });
            })
            .then(user => defer.resolve({user_id: user.id, token: user.getToken()}))
            .catch(error => defer.reject(error));

        return defer.promise;
    }

    authenticate(email:string, password:string):q.Promise<any>{
        const defer = q.defer();
        User.findOne({email})
            .exec()
            .then(user => {
                if(!user) throw new UserNotFoundException();
                return user.authenticate(password)
            })
            .then(result => defer.resolve(result))
            .catch(error => defer.reject(error))
        return defer.promise;
    }

    assignRole(user_id: string, role:USER_ROLE):q.Promise<any>{
        const defer = q.defer();
        User.findById(user_id)
            .exec()
            .then(user => {
                if(!user) throw new UserNotFoundException();
                user.role = role;
                return user.save();
            })
            .then(_ => defer.resolve())
            .catch(error => defer.reject(error))
        return defer.promise;
    }

    getUser(user_id:string):q.Promise<IUser>{
        const defer = q.defer<IUser>();
        User.findById(user_id)
            .exec()
            .then(user => defer.resolve(user))
            .catch(error => defer.reject(error));
        return defer.promise;
    }
}
