import * as multer from "multer";
import {IMAGES_LOCAL_FOLDER} from "../Utils/Config";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, IMAGES_LOCAL_FOLDER)
    },
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
});

export const ImageUpload = multer({
    storage: storage
})
