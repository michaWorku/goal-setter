const express = require('express')
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controller/goalController')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router()

router.use(protect)

router.route('/').get(getGoals).post(setGoal)

router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router