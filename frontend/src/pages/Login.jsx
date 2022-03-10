import React, { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
  const [formData, setFormData] = useState({ email:'', password:''})

  const {email, password} = formData

  const onChange = (e)=>{
    setFormData((prevState)=> setFormData({...prevState, [e.target.name]: e.target.value}))}

  const onSubmit = (e) =>{
    e.preventDefault()
  }
  

  return (
    <>
      <section className="heading">
        <h1><FaSignInAlt/> Login</h1>
        <p>Login and start settings goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" name = 'email' id='email' placeholder='Enter your email' value={email} onChange={onChange} className="form-control" />
          </div>
          <div className="form-group">
            <input type="password" name = 'password' id='password' placeholder='Enter your password' value={password} onChange={onChange} className="form-control" />
          </div>
          <div className="form-group">
            <button type='submit' className="btn btn-block"> submit </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login