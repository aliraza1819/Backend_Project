import { asyncHandler } from '../utils/asyncHandler.js';
import * as userService from '../services/user.services.js';
import ErrorHandler from '../utils/errorHandler.js';
import ApiResponse from '../utils/apiResponse.js';

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getUsers();
    res.json(users);
});

export const getUserById = asyncHandler(async (req, res, next) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }
    res.json(user);
});

export const createUser = asyncHandler(async (req, res) => {
    const {body, files} = req;
    
     const newUser = await userService.createUser(body, files);
        res.status(201).json(
        new ApiResponse(201, 'User created successfully', newUser)	
    );
});

export const updateUser = asyncHandler(async (req, res, next) => {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
        return next(new ErrorHandler('User not found', 404));
    }
    res.json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res, next) => {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
        return next(new ErrorHandler('User not found', 404));
    }
    res.json({ message: 'User deleted successfully' });
});
