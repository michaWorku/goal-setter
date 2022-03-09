//@desc Register new user
//@route POST /api/users
//@access public
const registerUser = (req,res)=>{
    res.json({message:'user registered'})
}

//@desc Authenticate a user
//@route POST /api/users/login
//@access public
const loginUser = (req,res)=>{
    res.json({message:'login user '})
}
//@desc Get user data
//@route POST /api/users/me
//@access public
const getMe = (req,res)=>{
    res.json({message:'user data'})
}
module.exports = {
    registerUser,loginUser,getMe
}