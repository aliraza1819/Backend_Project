import {User} from "../models/user.model.js";
import { baseRepository } from "./base.repository.js";

export const findByEmail= async (email) => User.findOne({ email }).select('-password  -refreshToken');

export const userRepository = baseRepository(User);


