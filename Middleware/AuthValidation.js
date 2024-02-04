const jwt = require("jsonwebtoken");
const ErrorHandler = require("../Utils/ErrorHandler");
const Psychiatrist = require("../Models/psychiatristModel");
require('dotenv').config();

const AuthValidator = async (req, res, next) => {
    const token = req.header('Authorization');
    if (token) {
        try {
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRETE);
            // console.log({ decoded });
            req.psychiatrist = await Psychiatrist.findById(decoded.psychiatrist._id);
            next();
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') return next(new ErrorHandler("Token expired", 401));
            else return next(new ErrorHandler("Invalid token", 401));
        }
    }
    else return next(new ErrorHandler("Please Login First!", 401));
};

module.exports = { AuthValidator };
