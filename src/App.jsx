import React, { useState, useLayoutEffect } from 'react';
import { hot } from 'react-hot-loader';

// import router
import { Route, Link, useLocation, useHistory } from 'react-router-dom';

// import pages
import Home from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Teams from './pages/Teams';
import LandingPage from './pages/LandingPage'

// import components
import {
  CreateResource,
  ResourceCard,
  CreateTeam,
  TeamDetails,
  NavBar,
 } from './components';
import { useStateValue } from './StateProvider';
import ResourceCardPage from './components/ResourceCardPage';

function App() {
  const location = useLocation().pathname;
  const history = useHistory();
  
  // const [button, setButton] = useState(<Link to="/CreateResource" className="btn btn-success">Create Resource</Link>);
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();

  // useLayoutEffect(() => {
  //   if (location === '/teams') {
  //     setButton(<Link to="/CreateTeam" className="btn btn-success">Create Team</Link>);
  //   } else if (location === '/CreateTeam' || location === '/CreateResource' || location === '/login' || location === '/signup') {
  //     setButton('');
  //   } else {
  //     setButton(<Link to="/CreateResource" className="btn btn-success">Create Resource</Link>);
  //   }
  // }, [location]);

  const userLogout = () => {
    // TO DO: consolidate
    localStorage.setItem('userIsLoggedIn', "false")
    localStorage.setItem('currentUser', "")
    localStorage.setItem('currentTeam', "")

    dispatch({
      type: 'UNAUTH_USER',
    });

    history.push('/');
  };

  console.log("User is logged in", user.isLoggedIn, user);

  return (
    <div className="app">
      { user.isLoggedIn || localStorage.getItem('userIsLoggedIn') ?
        (
          <div className="wrapper">
            <NavBar />

            <Route path="/" exact component={Home}></Route>
            <Route path="/teams/:id" component={TeamDetails} />
            <Route path="/teams" exact component={Teams} />
            <Route path="/CreateResource" component={CreateResource} />
            <Route path="/CreateTeam" component={CreateTeam} />
            <Route path="/resources" component={ResourceCard} /> 
          </div>
        ) : (
          <div>
            <Route path="/" exact component={LandingPage}></Route>
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
          </div>
        )
      }

      {/* { user.isLoggedIn ? (
        // authorized layout component (topNavbarAuth, sideNavBar, main, contentContainer )
        <div>
          <h1>User is Logged In</h1>
          <button type="button" onClick={userLogout}>Logout</button>
        </div>
        ) : (
          // unauthorized layout (topNavbarAuth landing page)
          <div>
            <h1>User is Not Logged In</h1>
            <button type="button"><Link to="/login">Login</Link></button>
            <button type="button"><Link to="/signup">Signup</Link></button>
          </div>
        )} */}
    </div>

    // <div className="outerContainer">
    //   {/* {user.isLoggedIn && <Navbars />} */}
    //   {/* <Navbars /> */}
    //   <div className="innerContainer">
    //     {/* use later in new login/logout buttons */}
    //     {/* <header className="mainHeader">
    //       <ul>
    //         <li className="primary-action">{button}</li>
            
    //       </ul>
    //     </header> */}
    //   </div>
    // </div>
  );
}

export default hot(module)(App);
