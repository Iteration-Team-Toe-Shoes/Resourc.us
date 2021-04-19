import React from "react"
import { Link } from 'react-router-dom';
import {LoginForm}  from '../components';

const LoginPage = () => {
  return (
    <div className="container formContainer">
      <h1>Sign in to your account <br></br> to continue</h1>
      <LoginForm></LoginForm>
      <hr></hr>
      <p>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  )
}

export default LoginPage;