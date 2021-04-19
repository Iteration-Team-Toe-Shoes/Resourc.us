import React from 'react';
import { Link } from 'react-router-dom';
import {SignUpForm} from '../components';

const SignupPage = () => (
  <div className="container formContainer">
    <h1>Get Started</h1>
    <SignUpForm />
    <hr></hr>
    <p>
      Have an account? <Link to="/login">Log In</Link>
    </p>
  </div>
);

export default SignupPage;
