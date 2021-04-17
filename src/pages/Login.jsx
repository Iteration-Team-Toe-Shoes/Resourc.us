import React from "react"
import { Link } from 'react-router-dom';
import {LoginForm}  from '../components';

const LoginPage = () => {
  return (
    <div className="container formContainer">
      <h1>This is Login.</h1>
      <LoginForm></LoginForm>
      <p>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  )
}

export default LoginPage;