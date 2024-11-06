const multer = require("multer")
//giving configuration to the multer

 const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, "./storage") // cb(error, success)
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname)
    }
    
})

// module.exports = multer // for the single but for the more then one we have to put like this 👇
module.exports = {
    multer,
    storage
}