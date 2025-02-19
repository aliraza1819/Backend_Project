import { asyncHandler } from '../utils/asyncHandler.js';
import * as authService from '../services/auth.services.js';
import ErrorHandler from '../utils/errorHandler.js';
import ApiResponse from '../utils/apiResponse.js';

export const loginUser = asyncHandler(async (req, res, next) => {
    
    const loginData = await authService.loginUser(req.body);  // FIXED: use authService

    if (!loginData) {
        return next(new ErrorHandler('User not found', 404));
    }
    const {accessToken,refreshToken}=loginData;
    res.cookie('refreshToken', refreshToken, {httpOnly: true,secure:true});
    res.cookie('accessToken', accessToken, {httpOnly: true,secure:true});
    


    res.json(new ApiResponse(200, 'Login successful', loginData));  // Send proper response
});


export const logoutUser = asyncHandler(async (req, res) => {
    const logout = await authService.logoutUser(req.user);  // FIXED: use authService

    
    return res
    .status(200)
    .clearCookie('accessToken', {httpOnly: true,secure:true})
    .clearCookie('refreshToken', {httpOnly: true,secure:true})
    .json(new ApiResponse(200, 'Logout successful',{}));
     
});


export const refreshToken = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return next(new ErrorHandler('Refresh token is required', 400));
    }
    const tokens = await authService.refreshToken(refreshToken);  // FIXED: use authService
    res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true,secure:true});
    res.cookie('accessToken', tokens.accessToken, {httpOnly: true,secure:true});
    res.json(new ApiResponse(200, 'Token refreshed', tokens));
});