import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js"

const authenticate = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        throw new ApiError(401, "Unauthorized")
    }   

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req._id = decoded.id

    next()  
})

export default authenticate