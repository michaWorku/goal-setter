import { useState } from 'react'
import { useDispatch } from 'react-redux'
import  {createGoal}  from '../features/goals/goalSlice'

const GoalForm = () => {
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubimt = e => {
        e.preventDefault()

        dispatch(createGoal({ text }))
        setText('')
    }

  return (
    <section className='form'>
        <form onSubmit={onSubimt} className="form">
            <label htmlFor="text">Goal</label>
            <div className="form-group">
                <input 
                    type="text" 
                    name='text' 
                    id='text' 
                    placeholder='Add goal' 
                    value={text} 
                    onChange={e => setText(e.target.value)} 
                />
            </div>
            <div className="form group">
                <button type='submit' className="btn btn-block">
                    Add Goal
                </button>
            </div>
        </form>
    </section >
  )
}

export default GoalForm