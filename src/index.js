import { config } from "dotenv";
config({path:"./.env"});

import { dbConnect } from "./db/index.js";
dbConnect();