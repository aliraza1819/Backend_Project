import {
    findByEmail,
  findOne,
  userRepository,
} from "../repositories/user.repository.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

const generateTokens = async (user) => {
    try {
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ErrorHandler("Token generation failed", 500);
    }
    
  };

export const loginUser = async (userData) => {
  const { email, password } = userData;
  // ✅ Validate required fields
  if (!email || !password) {
    throw new ErrorHandler("Email and password are required", 400);
  }
  // ✅ Check if the user exists
  const user = await findOne(email);
  if (!user) {
    throw new ErrorHandler("Invalid credentials", 401);
  }
  // ✅ Check if the password is correct
  const isPasswordMatched = await user.matchPassword(password);
  if (!isPasswordMatched) {
    throw new ErrorHandler("Invalid credentials", 401);
  }
  const loginUser = await findByEmail(email);

    // ✅ Generate tokens
    const {accessToken,refreshToken} = await generateTokens(loginUser);
    return {accessToken,refreshToken,loginUser};


 
};

export const logoutUser = async (user) => {
  await userRepository.update(user._id, { refreshToken: "" });
    return true;
}

export const refreshToken = async (refreshToken) => {
    if (!refreshToken) {
      throw new ErrorHandler("Refresh token is required", 400);
    }
   
      
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, user) => {
        if (err) {
          throw new ErrorHandler("Access denied", 401);
        }
        const user = await userRepository.findOne({ refreshToken });
    if (!user) {
      throw new ErrorHandler("Invalid refresh token", 400);
    }
    })
    const newtokenUser=await findByEmail(user.email);
    const {accessToken,refreshToken} = await generateTokens(newtokenUser);
    
    return {accessToken,refreshToken,newtokenUser};
     
    
  }