// require mongoose
const mongoose = require ("mongoose")

//  connect DB
const connectDB = async()=>{
    try  {
     await  mongoose.connect(process.env.DB_URI,
         {  useUnifiedTopology: true,
            useNewUrlParser: true  })
     console.log("Database is connected")
    }
    catch (error){
        console.log("Database can not connected", error)
    }                        
}                            

module.exports = connectDB