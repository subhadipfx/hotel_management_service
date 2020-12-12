import {createServer, Server} from "http";
import * as express from "express";
import {initialize as passportInitialize, use as passportUseStrategy} from "passport"
import * as cors from "cors";
require('dotenv').config()


import MongoConnection from "./Utils/MongoConnection";
import {IndexRouter} from "./Routers";
import PassportStrategy from "./Middlewares/PassportStrategy";
import * as path from "path";
class App {
    private readonly app:express.Express = null;
    private readonly server:Server = null;
    private readonly port:number = 3100;
    constructor(port:string = null) {

        this.app = express();
        this.server = createServer(this.app);

        if(port){
            if(isNaN(parseInt(port))){
                throw new Error("PORT MUST BE A VALID INTEGER")
            }
            this.port = parseInt(port);
        }else{
            this.port = parseInt(process.env.PORT);
        }
    }

    private bootStrap():void{

        console.log(__dirname);
        // this.app.set('public',path.join(__dirname,"/../public"));

        this.app.use('/public',express.static(path.join(__dirname,'../public')));

        const upperBound = '1gb';
        this.app.use(express.json({limit: upperBound}))
        this.app.use(express.urlencoded({extended: false, limit: upperBound}));

        this.app.use(passportInitialize());
        passportUseStrategy(PassportStrategy.JWTStrategy());

        this.app.use(cors());
        // this.app.use(fileUpload());

        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods","*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, APP-SESSION-ID, APP-VERSION");
            next();
        });


        this.app.use('/',new IndexRouter().associate())
    }

    public startServer():void{

        this.bootStrap();

        MongoConnection.connect()
            .then(() => console.log("Connected Database"))
            .then(() => this.server.listen(this.port))
            .then(() => console.log(`Server Started at port: ${this.port}`))
            .catch(error => {
                console.log(error)
                process.exit()
            })

    }
}

try{
    new App().startServer();
    // if(process.argv.length > 2){
    //     new App(process.argv.pop()).startServer();
    // }else{
    //     new App().startServer();
    // }
}catch (e){
    console.log(e)
    process.exit();
}
