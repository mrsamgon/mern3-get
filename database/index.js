const mongoose = require("mongoose")


async function conncetToDatabase(){
   await mongoose.connect(process.env.MONGODB_URI)
    console.log("Database conneted successfully Vayo hai ta")

}

module.exports = conncetToDatabase
