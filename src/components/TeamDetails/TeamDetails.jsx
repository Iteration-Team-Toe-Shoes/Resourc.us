import React, { useState, useEffect } from "react";
import {ResourceCard} from "../ResourceCard";
import {Button, Container, Row, Col} from "react-bootstrap";
import {useUserContext} from '../../StateProvider';

function TeamDetails({ match }) {
  // get the team ID from the URL params (destructure props.match.params)
  const { params: { id } } = match;
  const [team, setTeam] = useState([]);
  const [teamResources, setTeamResources] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const {user} = useUserContext();

  useEffect(() => {
    // when team page is visited, set current team in localStorage
    localStorage.setItem('currentTeam', id)

    // GET team details by ID
    fetch("http://localhost:3000/teams/list")
      .then(response => response.json())
      .then(data => {
        const team = data.filter(t => t._id === id)
        setTeam(team)
      })
      .then(() => {
        // GET resources that belong to current team by team ID
        fetch("http://localhost:3000/resource/listAll")
          .then(response => response.json())
          .then(data => {
            const currentResources = data.filter(r => r.team === id)
            setTeamResources(currentResources)
          })
      })
      .catch(err => {
        console.error('GET FAILED', err);
      })
  }, [])

  useEffect(() => {
    if (!team[0]?.adminsList) setIsAdmin(false);
    if (team[0]?.adminsList?.includes(user.user.id)) setIsAdmin(true);
  }, [team]);

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
					<a href="/CreateResource" className="btn btn-primary float-right mt-n1">Create a Resource</a>

          <div className="searchContainer">
            {/* <SearchField
            placeholder="Search teams..."
            onSearchClick={(value) => onSearch(value)}
            /> */}
            {/* <button type="button" onClick={onClearSearch} style="margin-left:15px">Clear Search</button> */}
          </div>

					<div className="row">

          {team.map(t => (
          <div key={t._id}>
              <h1>{t.name}</h1>

              {isAdmin && (
                <Button 
                  variant="outline-dark" 
                  size="sm"
                  className="editButton"
                >
                  Edit
                </Button>
              )}

              <p>{t.categoriesList[0]?.name ?? "Category"}</p>

            <ResourceCard teamId={t._id}></ResourceCard>

            {/* CARD COMPONENT (resource) */}
            <div className="row">
            {teamResources.map(resource => (
              <div key={resource._id} className="col-12 col-md-6 col-lg-4">
                <div className="card">
                  <img className="card-img-top" src={resource?.profilePic ?? "https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} alt="Unsplash" />
                  <div className="card-header px-4 pt-4">
                    <h5 className="card-title mb-0">{resource.title}</h5>
                    <div className="meta">
                      {resource.tags.map(tag => 
                        <div className="badge badge-secondary my-2">{tag.name}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        ))}

          </div>
        </div>  
        </main>
      </div>
    </div>  
  );
}

export {TeamDetails};