import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {Link} from 'react-router-dom';

// bootstrap components
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import {
  Nav,
  Navbar as RBNavBar,
  NavItem,
} from "react-bootstrap";
// import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,
  faAddressCard,
  faUserFriends,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  return (
    <nav id="sidebar" className="sidebar">
    <div className="sidebar-content js-simplebar">
      <a className="sidebar-brand" href="/">
        <span className="align-middle mr-3"><i className='bx bx-bolt-circle'></i> Resourcus</span>
      </a>

      <ul className="sidebar-nav">
        <li className="sidebar-link"><Link to='/'><i className='bx bx-home-heart' ></i> Home</Link></li>
        <li className="sidebar-link"><Link to='/profile'><i className='bx bx-home-heart' ></i> Profile</Link></li>
        <li className="sidebar-link"><Link to='/teams'><i className='bx bx-group' ></i> Teams</Link></li>
        <li className="sidebar-link"><Link to='/resources'><i className='bx bx-home-heart' ></i> Resources</Link></li>
      </ul>
    </div>
  </nav>
  );
}

export {NavBar};
