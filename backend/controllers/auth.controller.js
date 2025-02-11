import asyncHandler from "../utils/asyncHandler.js"
import {z} from "zod"
import ApiError from "../utils/ApiError.js"
import User from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js"

const userSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8),
})

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body

    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    if(!userSchema.parse(req.body)) {
        throw new ApiError(400, "Invalid data")
    }

    const user = await User.findOne({email})

    if(user) {
        throw new ApiError(400, "User already exists")
    }

    const newUser = await User.create({username, email, password})

    const token = newUser.generateToken()

    res.status(201).json(new ApiResponse(201, token , "User created successfully"))
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({email})

    if(!user) {
        throw new ApiError(400, "User not found")
    } 

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect) {
        throw new ApiError(400, "Invalid password")
    }

    const token = user.generateToken()

    res.status(200).json(new ApiResponse(200, token, "Login successful"))
})

export {registerUser, loginUser}