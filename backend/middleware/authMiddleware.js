const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    //check authorization  header and starts with Bearere
    if( req.headers.authorization  &&
        req.headers.authorization.startsWith('Bearer')){

        try{
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            
            // Verifiy token
            const decoded =  jwt.verify(token, process.env.JWT_SECRTE)

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error('Not authorized')
        }
        
    }
    
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
   
})

module.exports = {
    protect
}