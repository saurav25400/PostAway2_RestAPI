import multer from "multer";

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploadFiles'); //file location will be with respect to server files.
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname);
    }
})
export const upload=multer({
    storage:storage
})