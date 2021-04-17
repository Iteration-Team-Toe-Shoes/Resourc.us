import React, { useEffect, useState } from "react";
import { Link, Route } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';
import { useUserContext } from '../StateProvider';

function HomePage() {
  // State for our three teams
  const [_teams, setTeams] = useState([]);
  // State for each teams' 3 resources.
  // [ [{1}, {2}, {3}], [{4}, {5}, {6}], [{7}, {8}, {9}] ]
  //const [_resources, setResources] = useState([[{}, {}, {}], [{}, {}, {}], [{}, {}, {}]]);
  const [_resources, setResources] = useState([]);
  
  const [{ user }, dispatch] = useUserContext();
  const [ teams, setTeams ] = useState([]);
  const [ otherTeams, setOtherTeams ] = useState([]);

  // Temporarily going to just display a list of all resources on the homepage
  // useEffect(() => {
  //   fetch("http://localhost:3000/resource/listAll")
  //     .then(response => {
  //       return response.json(); //Parses to JSON
  //     }).then(data => {
  //       setResources(data);
  //       // console.log(data); ENDLESS RUNNING BUG!?
  //     }).catch(err => {
  //       console.log('GET FAILED', err);
  //     })
  // }, [])

  // get values from state
  const [{ user }, dispatch] = useStateValue();
  
  useEffect(()=> {
    if (user.isLoggedIn) {
      fetch("http://localhost:3000/teams/joinedList")
      .then((res) => res.json())
      .then(allTeams => {
        const userTeams = [];
        const nonUserTeams = [];

        for (let i=0; i < allTeams.length; i++) {
          if (user.teamsList.includes(allTeams[i]._id.toString())) {
            userTeams.push(allTeams[i])
          } else {
            nonUserTeams.push(allTeams[i])
          }
        }
        setTeams(userTeams);
        setOtherTeams(nonUserTeams);
      }).catch(err => {
        console.log('GET FAILED', err);
      })
    
    }

  }, []);

  const joinTeam = (team) => {
    console.log("join team", team);
    const updatedUser = JSON.parse(JSON.stringify(user));
    updatedUser.teamsList.push(team._id);
    dispatch({
      type: 'JOIN_TEAM',
      item: updatedUser,
    })

    const teamsUpdate = JSON.parse(JSON.stringify(teams));
    teamsUpdate.push(team);

    const otherTeamsUpdate = JSON.parse(JSON.stringify(otherTeams));
    let index = undefined;
    for (let i=0; i < otherTeamsUpdate.length; i++){
      if (otherTeamsUpdate[i]._id === team._id){
        index = i;
      }
    }
    otherTeamsUpdate.splice(index, 1);

    setOtherTeams(otherTeamsUpdate);
    setTeams(teamsUpdate);

    // Add to mongoDB database    
    fetch("http://localhost:3000/teams/join", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then(res => {
        console.log(res);
        console.log(res.teamsList);
      }).catch(err => {
        console.log('UPDATING TEAM FAILED', err);
      })
    

  }

  const leaveTeam = (team) => {
    console.log(team);
    const updatedUser = JSON.parse(JSON.stringify(user));
    let index = undefined;
    for (let i=0; i < updatedUser.teamsList.length; i++){
      if (updatedUser.teamsList[i] === team._id){
        index = i;
      }
    }
    updatedUser.teamsList.splice(index, 1);
    
    dispatch({
      type: 'LEAVE_TEAM',
      item: updatedUser,
    })


    const otherTeamsUpdate = JSON.parse(JSON.stringify(otherTeams));
    otherTeamsUpdate.push(team);
    setOtherTeams(otherTeamsUpdate);
    console.log(otherTeamsUpdate);

    const teamsUpdate = JSON.parse(JSON.stringify(teams));
    let teamsIndex = undefined;
    for (let i=0; i < teamsUpdate.length; i++){
      if (teamsUpdate[i]._id === team._id){
        teamsIndex = i;
      }
    }
    teamsUpdate.splice(teamsIndex, 1);
    
    setTeams(teamsUpdate); ////////// NEED TO FIX THIS TO BE THE OTHER LIST WITH FULL TEAM INFO
    console.log(teamsUpdate);
    

    // Add to mongoDB database    
    fetch("http://localhost:3000/teams/leave", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then(res => {
        console.log(res);
        console.log(res.teamsList);
      }).catch(err => {
        console.log('UPDATING TEAM FAILED', err);
      })
    

  }

  return (
    <div className="wrapper">
      {/* SIDE NAVBAR COMPONENT */}
      <nav id="sidebar" className="sidebar">
        <div className="sidebar-content js-simplebar">
          <a className="sidebar-brand" href="/">
            <span className="align-middle mr-3"><i className='bx bx-bolt-circle'></i> Resourcus</span>
          </a>

          <ul className="sidebar-nav">
            <li className="sidebar-header">Home</li>
            <li className="sidebar-header">Teams</li>
            <li className="sidebar-header"><Link to='/'><i className='bx bx-home-heart' ></i> Home</Link></li>
            <li className="sidebar-header"><Link to='/teams'><i className='bx bx-group' ></i> Teams</Link></li>

            <li className="sidebar-item">
              <a href="/teams" className="sidebar-link ">
                <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">View All Teams</span>
              </a>
            </li>

            <li className="sidebar-item active">
              <a href="#pages" data-toggle="collapse" className="sidebar-link">
                <i className="align-middle" data-feather="layout"></i> <span className="align-middle">My Teams</span>
              </a>
              <ul id="pages" className="sidebar-dropdown list-unstyled collapse show" data-parent="#sidebar">
                <li className="sidebar-item"><a className="sidebar-link" href="pages-profile.html">Team 1</a></li>
                <li className="sidebar-item"><a className="sidebar-link" href="pages-settings.html">Team 2</a></li>
                <li className="sidebar-item"><a className="sidebar-link" href="pages-clients.html">Team 3</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

    {/* MAIN LAYOUT COMPONENT */}
		<div className="main">

      {/* TOP NAVBAR COMPONENT */}
			<nav className="navbar navbar-expand navbar-light navbar-bg">
				<a className="sidebar-toggle">
          {/* <i className="hamburger align-self-center"></i> */}
          <i className='bx bx-menu-alt-left hamburger'></i>
        </a>

				<form className="d-none d-sm-inline-block">
					<div className="input-group input-group-navbar">
						<input type="text" className="form-control" placeholder="Search…" aria-label="Search" />
						<div className="input-group-append">
							<button className="btn" type="button">
                <i className='bx bx-search-alt-2'></i>
              </button>
						</div>
					</div>
				</form>

				<div className="navbar-collapse collapse">
					<ul className="navbar-nav navbar-align">
						<li className="nav-item dropdown">
							<a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-toggle="dropdown">
                <i className="align-middle" data-feather="settings"></i>
              </a>

							<a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-toggle="dropdown">
                <i className='bx bx-user-circle' ></i> <span className="text-dark">{user.firstName} {user.lastName}</span>
                {/* <img src={avatar} className="avatar img-fluid rounded-circle mr-1" alt="Chris Wood" /> <span className="text-dark">Chris Wood</span> */}
              </a>
							<div className="dropdown-menu dropdown-menu-right">
								<a className="dropdown-item" href="pages-profile.html"> 
                  <i className='bx bx-user' ></i> Profile
                </a>
                <a className="dropdown-item" href="pages-settings.html">
                  <i className='bx bx-cog' ></i> Settings
                </a>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="#">Sign out</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>

      {/* CONTENT CONTAINER COMPONENT */}
			<main className="content">
				<div className="container-fluid p-0">

					{/* <a href="#" className="btn btn-primary float-right mt-n1">Create a Team</a>
					<h1 className="h3 mb-3">Teams</h1> */}

          <h1>Welcome Back, {user.firstName}</h1>

					<div className="row">
            <p>KEVIN'S PR GOES HERE </p>
            {/* CARD COMPONENT (team or resource) */}
            {/* <div className="col-12 col-md-6 col-lg-4">
							<div className="card">

								<img className="card-img-top" src="img/photos/unsplash-1.jpg" alt="Unsplash" />

								<div className="card-header px-4 pt-4">
									<h5 className="card-title mb-0">Codesmith PTRI 2</h5>
									<div className="badge badge-secondary my-2">Computer Science</div>
								</div>
								<div className="card-body px-4 pt-2">
									<p>Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris.</p>
								</div>
                <div className="card-body px-4 pt-2">
                  <button className="btn btn-outline-info">View</button>
                  <button className="btn btn-success btn-join-team">Join</button>
                </div>
	
							</div>
						</div> */}

          </div>
        </div>  
        </main>
      </div> 
    
    
    // update UI on this part
    <div className="container">
      <h1>Home Page</h1>
      <div className="cardContainer">
        {user.isLoggedIn && <h2>Your Teams:</h2>}
        {user.isLoggedIn && teams.map(team =>
          <div className="teamCard" key={team._id}>
            <header>
              <img src="https://images.unsplash.com/photo-1612392166886-ee8475b03af2?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2102&q=80" />
              <div className="mask" style={{ background: `linear-gradient(${colors[colorPicker()][0]}, ${colors[colorPicker()][1]})` }}></div>
              <h1>{team.name}</h1>
            </header>
            <section>
              <div className="meta">
                <div>{team.category}</div>
                <div><i className='bx bx-merge'></i> 342</div>
                <div><i className='bx bxs-user-account'></i> 24</div>
              </div>
              <article>
                <p>{team.description}</p>
              </article>
              <div className="actions">
                <div>
                  { user.teamsList.indexOf(team._id) !== -1 && <button type="button" onClick={() => leaveTeam(team)}>Leave Team</button>}
                  <Link className="btn btn-primary" to={"/teams/" + team._id}>View</Link>
                </div>
              </div>
            </section>
          </div>
        )}
        {user.isLoggedIn && <h2>Discover:</h2>}
        {user.isLoggedIn && otherTeams.map(team =>
          <div className="teamCard" key={team._id}>
            <header>
              <img src="https://images.unsplash.com/photo-1612392166886-ee8475b03af2?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2102&q=80" />
              <div className="mask" style={{ background: `linear-gradient(${colors[colorPicker()][0]}, ${colors[colorPicker()][1]})` }}></div>
              <h1>{team.name}</h1>
            </header>
            <section>
              <div className="meta">
                <div>{team.category}</div>
                <div><i className='bx bx-merge'></i> 342</div>
                <div><i className='bx bxs-user-account'></i> 24</div>
              </div>
              <article>
                <p>{team.description}</p>
              </article>
              <div className="actions">
                <div>
                { user.teamsList.indexOf(team._id) === -1 && <button type="button" onClick={() => joinTeam(team)}>Join</button>}
                { user.teamsList.indexOf(team._id) !== -1 && <p>Joined</p> }
                  <Link className="btn btn-primary" to={"/teams/" + team._id}>View</Link>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
		</div>
}

export default HomePage;
