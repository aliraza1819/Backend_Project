import { findByEmail, userRepository } from "../repositories/user.repository.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getUsers = async () => {
  return await userRepository.findAll();
};

export const getUserById = async (id) => {
  return await userRepository.findById(id);
};

export const createUser = async (userData, files) => {
  const {
    firstName,
    lastName,    
    email,
    password,
    phone,
    address,
    city,
    
    
  } = userData;
  // ✅ Validate required fields
  if([firstName, lastName, email, password, phone, address, city].includes(undefined)){
    throw new ErrorHandler("All fields are required", 400);
  }


  // ✅ Check if the user already exists
  const existedUser = await findByEmail(email);
  if (existedUser) {
    throw new ErrorHandler("User already exists", 400);
  }

  // ✅ Handle file upload safely
  let profileImagePath = null;
  if (files?.profileImage && files.profileImage.length > 0) {
    profileImagePath  = files.profileImage[0].path;             
  } else {
    throw new ErrorHandler("Profile image is required", 400);
  }
  const Img=await uploadOnCloudinary(profileImagePath);
 if(!Img){
     throw new ErrorHandler("Profile Image upload failed", 500);
  
 }
  // ✅ Save user data to the database
  const newUser = await userRepository.create({
    ...userData,
    profileImage: Img.url || "",
  });
  const createdUser = await findByEmail(newUser.email);

if (!createdUser) { 
    throw new ErrorHandler("Something went wrong while creating user", 504);
}

return createdUser; 
   
  
};

export const updateUser = async (id, userData) => {
  return await userRepository.update(id, userData);
};

export const deleteUser = async (id) => {
  return await userRepository.delete(id);
};
