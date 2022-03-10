const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const Goal = require('../model/goalModel')

// @desc Get Goals
// @route GET /api/goals
// @access private
const getGoals = asyncHandler( async (req,res)=> {
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

// @desc Set Goal
// @route POST api/goals
// @access private
const setGoal = asyncHandler( async (req,res)=> {
    if(!req.body.text){ 
        res.status(400);
        throw new Error('Please Add a Text field');
    }

    const goal = await Goal.create({text: req.body.text, user: req.user.id})

    res.status(200).json(goal)
})

// @desc Update Goal
// @route PUT api/goals/:id
// @access private
const updateGoal = asyncHandler( async (req,res)=> {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

     // check for user
     if(!req.user){
         res.status(401)
         throw new Error('User not found')
     }

     // check for goal user id matched with user id
     if(goal.user.toString() !== req.user.id){
         res.status(401)
         throw new Error('User not authorized')
     }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
}
)

// @desc Delete Goal
// @route DELETE api/goals/:id
// @access private
const deleteGoal = asyncHandler( async (req,res)=> {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    // check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    
    // check for goal user id matched with user id
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    //await Goal.findByIdAndDelete(req.params.id)
    await goal.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {getGoals, setGoal, updateGoal, deleteGoal}


