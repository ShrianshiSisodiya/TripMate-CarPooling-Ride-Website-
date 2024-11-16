const mongoose = require("mongoose");
const dotenv = require("dotenv");


const app = require("./app");



dotenv.config({
    path: './.env'
});



const connectDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/carpool`)

        console.log(`MongoDB Connected || DB HOST: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("MONGODB CONNECTION ERROR", error)
    }
}



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MONGODB connection failed", err)
    })

