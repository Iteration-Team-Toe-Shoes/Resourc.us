import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container">
      <nav> 
        <Link className="btn btn-primary" to="/login">Log In</Link>
        {/* <Link className="btn btn-success" to="/signup">Sign up</Link> */}
      </nav>
      <div className="landing-hero">
      <h1>Resourcus</h1>

      <h2>Sign Up Today <br></br> to find the resources you need</h2>

      <Link className="btn btn-success btn-lg" to="/signup">Get Started</Link>
    </div>
    </div>
  )
}

export default LandingPage;