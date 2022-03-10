const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

//@desc Register new user
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req,res)=>{
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exits
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User alrady exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name, email, password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id : user.id,
            name: user.name,
            email: user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc Authenticate a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body

    // check for user email and password matched
    const user = await User.findOne({email})

    if(user && ( await bcrypt.compare(password, user.password))){
        res.json({
            _id:user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc Get user data
//@route POST /api/users/me
//@access private
const getMe = asyncHandler(async (req,res)=>{
    res.status(200).json(req.user)
})

// Generate token
const generateToken =(id)=> jwt.sign({id}, process.env.JWT_SECRTE, {expiresIn: '1d'})

module.exports = {
    registerUser,loginUser,getMe
}