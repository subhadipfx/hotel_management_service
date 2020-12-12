import * as multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
});

export const ImageUpload = multer({
    storage: storage
})
