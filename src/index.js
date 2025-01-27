import { config } from "dotenv";
config({path:"./.env"});

import { dbConnect } from "./db/index.js";
import { app } from "./app.js";
const port=process.env.PORT || 8000;

dbConnect().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });

}).catch((error)=>{
    console.log("error in connection of database",error)
});