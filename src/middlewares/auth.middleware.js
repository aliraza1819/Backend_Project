
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const verifyJWT = asyncHandler(async (req, _ , next) => {
    try {
      const token = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        throw new ErrorHandler("Access denied", 401);
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          throw new ErrorHandler("Access denied", 401);
        }
        req.user = user;
        next();
      });
    } catch (error) {
        throw new ErrorHandler("Access denied", 401);
  
      
    }
  })