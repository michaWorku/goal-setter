import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'

const Register = () => {
  const [formData, setFormData] = useState({name:'', email:'', password:'', confirmPassword:''})

  const {name, email, password, confirmPassword} = formData

  const onChange = (e)=>{
    setFormData((prevState)=> setFormData({...prevState, [e.target.name]: e.target.value}))}

  const onSubmit = (e) =>{
    e.preventDefault()
  }
  

  return (
    <>
      <section className="heading">
        <h1><FaUser/> Register</h1>
        <p>Please crate an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" name = 'name' id='name' placeholder='Enter your name' value={name} onChange={onChange} className="form-control" />
          </div>
          <div className="form-group">
            <input type="text" name = 'email' id='email' placeholder='Enter your email' value={email} onChange={onChange} className="form-control" />
          </div>
          <div className="form-group">
            <input type="password" name = 'password' id='password' placeholder='Enter your password' value={password} onChange={onChange} className="form-control" />
          </div>
          <div className="form-group">
            <input type="password" name = 'confirmPassword' id='confirmPassword' placeholder='Confirm password' value={confirmPassword} onChange={onChange} className="form-control" />
          </div>
          <div className="form-group">
            <button type='submit' className="btn btn-block"> submit </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register