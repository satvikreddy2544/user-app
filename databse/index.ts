import mongoose from "mongoose"
export default async function connectToDb() {

    const url = process.env.MONGODB_CONNECTION_URL || "";
    console.log("db url" , url);

    try{

        const res = await mongoose.connect(url);
        console.log("connected to db")

    }catch(e){

        console.log("error occured while connecting to db")
    }
    
}