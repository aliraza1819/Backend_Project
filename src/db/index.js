import { databaseName } from "../constants.js";
import mongoose from "mongoose";

export const dbConnect = async () => {

    try {
        const connectionResponse=await mongoose.connect(`${process.env.MONGODB_URI}/${databaseName}`);
        console.log(`MongoDb connected host is :${connectionResponse.connection.host}`);
        
    } catch (error) {
        console.log("Error in Connection of database",error);
        process.exit(1);
        
    }
}