import React, { useState, useEffect } from "react";
import { Link, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { CategoriesTagsSunBurst } from '../components/CategoriesTagsSunBurst';
import { PopularResourcesBarChart } from '../components/PopularResourcesBarChart';
import { useUserContext, useStateValue } from '../StateProvider';
// import SearchField from 'react-search-field';

function Teams() {
  const [_teams, setTeams] = useState([]);
  const [_teamsCopy, setTeamsCopy] = useState([]);
  const { user , dispatch} = useUserContext();

  // get values from state
  // const [{ user }, dispatch] = useStateValue();
  console.log('user:', user)

  useEffect(() => {
    fetch("http://localhost:3000/teams/list")
    .then((response) => {
      return response.json(); //Parses to JSON
    }).then(data => {
      console.log(data);
      setTeams(data);
      // console.log(data); ENDLESS RUNNING BUG!?
    })
    .catch(err => {
      console.log('GET FAILED', err);
    })
  }, []);

  // const colors = [
  //   ['#ff4b1f', '#ff9068'],
  //   ['#16BFFD', '#CB3066'],
  //   ['#1D4350', '#A43931'],
  //   ['#a80077', '#66ff00'],
  //   ['#ff4b1f', '#1fddff'],
  //   ['#0D0D0D', '#434343'],
  //   ['#4B79A1', '#283E51'],
  //   ['#834d9b', '#d04ed6'],
  //   ['#0099F7', '#F11712'],
  //   ['#B24592', '#F15F79'],
  //   ['#673AB7', '#512DA8'],
  //   ['#005C97', '#363795']
  // ]
  // function colorPicker() {
  //   return Math.floor(Math.random() * colors.length);
  // }

  const joinTeam = (teamID) => {
    console.log(teamID);
    const updatedUser = JSON.parse(JSON.stringify(user));
    updatedUser.teamsList.push(teamID);

    dispatch({
          type: 'JOIN_TEAM',
          item: updatedUser,
        })

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

  // const onSearch = async (value) => {
  //   const searchedTeams = _teams.filter(team => team.name.toLowerCase().includes(value.toLowerCase()) || team.description.toLowerCase().includes(value.toLowerCase()))
  //   setTeams(searchedTeams);
  // }

  // const onClearSearch = () => {
  //   setTeams(_teamsCopy);
  // }

  return (
    <div className="wrapper">

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
          {/* <Link to="/CreateTeam" className="btn btn-success">Create Team</Link> */}
					<a href="/CreateTeam" className="btn btn-primary float-right mt-n1">Create a Team</a>
					<h1 className="h3 mb-3">Teams</h1>

          {/* Chart Visualization Container */}
          <Container>
            <Row>
              <Col xs="6">
                <div style={{ width: 400, height: 300 }}>
                  <CategoriesTagsSunBurst />
                </div>
              </Col>
              <Col xs="6">
                <PopularResourcesBarChart />
              </Col>
            </Row>
          </Container>

          <div className="searchContainer">
            {/* <SearchField
            placeholder="Search teams..."
            onSearchClick={(value) => onSearch(value)}
            /> */}
            {/* <button type="button" onClick={onClearSearch} style="margin-left:15px">Clear Search</button> */}
          </div>

					<div className="row">

            {/* CARD COMPONENT (team) */}
            {user.user.isLoggedIn && _teams.map(team =>
              <div key={team._id} className="col-12 col-md-6 col-lg-4">
                <div className="card">
                  <img className="card-img-top" src={team?.profilePic ?? "https://blogs.sas.com/content/sastraining/files/2015/03/black_background.png"} alt="Unsplash" />
                  <div className="card-header px-4 pt-4">
                    <h5 className="card-title mb-0">{team.name}</h5>
                    <div className="meta">
                      {console.log(team?.categoriesList)}
                      <div className="badge badge-secondary my-2">{team?.categoriesList[0] ? team?.categoriesList[0]?.name : "General"}</div>
                      <div><i className='bx bx-merge'></i>{team.resourcesCount}</div>
                      <div><i className='bx bxs-user-account'></i> {team.usersCount}</div>
                    </div>
                  </div>
                  <div className="card-body px-4 pt-2">
                    <p>{team.description}</p>
                  </div>
                  <div className="card-body px-4 pt-2 actions">
                    <Link className="btn btn-info" to={"/teams/" + team._id}>View</Link>
                    { user.user.teamsList.indexOf(team._id) !== -1 && <button type="button" className="btn btn-sucess" onClick={() => leaveTeam(team)}>Leave Team</button>}
                    {/* { user.isLoggedIn && user.teamsList.indexOf(team._id) === -1 && <button type="button" onClick={() => joinTeam(team._id)}>Join</button>}
                    { user.isLoggedIn && user.teamsList.indexOf(team._id) !== -1 && <p>Joined</p> } */}
                  </div>
                </div>
              </div>
            )}
            {/* {_teams.map(team =>
            <div key={team._id} className="col-12 col-md-6 col-lg-4">
							<div className="card">
								<img className="card-img-top" src="img/photos/unsplash-1.jpg" alt="Unsplash" />
								<div className="card-header px-4 pt-4">
									<h5 className="card-title mb-0">{team.name}</h5>
                  <div className="meta">
                    <div className="badge badge-secondary my-2">{team.categoriesList[0] ? team.categoriesList[0].name : "General"}</div>
                    <div><i className='bx bx-merge'></i>{team.resourcesCount}</div>
                    <div><i className='bx bxs-user-account'></i> {team.usersCount}</div>
                  </div>
								</div>
								<div className="card-body px-4 pt-2">
									<p>{team.description}</p>
								</div>
                <div className="card-body px-4 pt-2 actions">
                  <Link className="btn btn-info" to={"/teams/" + team._id}>View</Link>
                  { user.isLoggedIn && user.teamsList.indexOf(team._id) === -1 && <button type="button" onClick={() => joinTeam(team._id)}>Join</button>}
                  { user.isLoggedIn && user.teamsList.indexOf(team._id) !== -1 && <p>Joined</p> }
                </div>
							</div>
						</div>)} */}

          </div>
        </div>  
        </main>
      </div>  

      {/* <div className="cardContainer">
        {_teams.map(team =>
          <div className="teamCard" key={team.name}>
            <header>
              <img src="https://images.unsplash.com/photo-1612392166886-ee8475b03af2?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2102&q=80" />
              <div className="mask" style={{ background: `linear-gradient(${colors[colorPicker()][0]}, ${colors[colorPicker()][1]})` }}></div>
              <h1>{team.name}</h1>
            </header>
            <section>
              <div className="meta">
                <div>{team.categoriesList[0]?.name ?? "Category"}</div>
                <div><i className='bx bx-merge'></i>{team.resourcesCount}</div>
                <div><i className='bx bxs-user-account'></i> {team.usersCount}</div>
              </div>
              <article>
                <p>{team.description}</p>
              </article>
              <div className="actions">
                <div>
                  { user.isLoggedIn && user.teamsList.indexOf(team._id) === -1 && <button type="button" onClick={() => joinTeam(team._id)}>Join</button>}
                  { user.isLoggedIn && user.teamsList.indexOf(team._id) !== -1 && <p>Joined</p> }
                  {/* <Link className="btn btn-primary" to={"/teams/" + team.name.toLowerCase().trim().replace(/\s/g, "-")} team={team}>View</Link> */}
                  {/* <Link className="btn btn-primary" to={"/teams/" + team._id}>View</Link>
                </div>
              </div>
            </section>
          </div>
        )}
      </div> */}
		</div>
  );
}

export default Teams;

// const teamPageUrl = team.name
