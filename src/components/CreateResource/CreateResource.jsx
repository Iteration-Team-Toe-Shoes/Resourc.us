import React, { useState, useEffect } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Multiselect } from 'multiselect-react-dropdown';
import { useHistory } from 'react-router-dom';

function CreateResource() {
  const currentTeam = localStorage.getItem('currentTeam')
  const currentUser = localStorage.getItem('currentUser')
  const history = useHistory();
  
  // State
  const [_payload, setPayload] = useState({
    title: "",
    description: "",
    link: "",
    team: currentTeam, // team is preselected if already on team page
    votes: 0,
    tags: [],
    commentsList: [],
    postedBy: currentUser, // user is auto-populated if logged in
    relatedLocation: "606fb3c636dc0202b002d997" // currently "anywhere" by default
  });

  const [_teams, setTeams] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/teams/list")
      .then((response) => {
        return response.json(); //Parses to JSON
      })
      .then((data) => {
        setTeams(data);
        // console.log(data); ENDLESS RUNNING BUG!?
      })
      .catch((err) => {
        console.log("GET FAILED", err);
      });
  }, []);

  // tag options
  const [ tagOptions, setTagOptions ] = useState([])
  const [ newTagOption, setNewTagOption] = useState([])
  const [ selectedTags, setSelectedTags ] = useState([])

  function getTagsFromDB() {
    fetch("http://localhost:3000/tags/list")
      .then(response => response.json())
      .then(data => {
        console.log('tag options', data)
        setTagOptions(data)
      })
      .catch( err => {
        console.log("FAILED TO GET TAG OPTIONS", err)
      })
  }

  // invoked when the component renders initially
  useEffect(() => {
    getTagsFromDB()
  }, [])

  // invoked only when there is a change in selectedTags state
  useEffect(() => {
    getTagsFromDB()
  }, [selectedTags])

  // during tag search, capture search query 
  function handleTagSearch() {
    const newValues = document.getElementById('search_input').value
    setNewTagOption(newValues)
    console.log('newValues: ', newValues)
  }

  // if tag doesn't exist in DB,
  // create it and update the tag options in state
  function createNewTag(e) {
    e.preventDefault()
    console.log('newTagOption:', newTagOption)
    // post to DB and create tag
    fetch("http://localhost:3000/tags/create", {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "name": newTagOption, mentionCount: 0}),
    })
    .then(response => response.json())
    .then((data) => {
      console.log('tag created data:', data);

      // clear input value after creating new tag
      // document.getElementById('search_input').value = ""

      // upon creation success, add tag to selectedTags state, 
      // which will trigger Multiselect component to re-render and run useEffect()
      setSelectedTags([ ...selectedTags, data]) 
    })
    .catch((err) => {
      console.log("POST Failed to create tag", err);
    });
  }

  function handleTagSelect(selectedList, selectedItem) {
    setSelectedTags([ ...selectedTags, selectedItem])
    console.log(selectedList, 'selectedItem:', selectedItem)
  }

  function handleTagRemove(selectedList, removedItem) {
    const updatedList = selectedTags.filter(tag => tag.name !== removedItem.name)
    setSelectedTags(updatedList)
    console.log(selectedList, 'removedItem:', removedItem)
  }


  function handleChange(event) {
    const { name, value } = event.target; //event target is each indivisual form that is being inputed
    console.log(_payload);
    setPayload({ ..._payload, [name]: value }); // copies previous state and updates only changed key/values
  }

  function handleClick(event) {
    event.preventDefault();

    // update the tags array in resource payload
    const tagIDs = selectedTags.map(tag => tag._id)
    _payload['tags'] = tagIDs

    // POST the payload to database
    fetch("http://localhost:3000/resource/create", {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_payload),
    })
      .then(response => response.json())
      .then((data) => {
        console.log('created resource:', data);
        // TO DO: redirect to team page
        const lastPage = '/teams/' + localStorage.getItem('currentTeam')
        history.push(lastPage)
      })
      .catch((err) => {
        console.log("POST Failed to create resource", err);
      });
    // ADD RESET STATE HERE AFTER SUMBIT
  }

  function selectTeam(e) {
    const payload = _payload;
    payload.teamId = e.currentTarget.value;
    setPayload(payload);
    console.log(_payload);
  }

  return (
    <div className='container formContainer'>
      <h1>{_payload.title ? _payload.title : "New Resource"}</h1>
      <form>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="title"
            value={_payload.title}
            autoComplete="off"
            className="form-control"
            placeholder="Title"
          ></input>
        </div>

        <div className="form-group">
          <input
            onChange={handleChange}
            name="description"
            value={_payload.description}
            autoComplete="off"
            className="form-control"
            placeholder="Description"
          ></input>
        </div>

        <div className="form-group">
          <input
            onChange={handleChange}
            name="link"
            value={_payload.link}
            autoComplete="off"
            className="form-control"
            placeholder="link"
          ></input>
        </div>
        
        {/* Tag Multiselect Component */}
        <Multiselect
          className="form-control"
          placeholder="select tags"
          options={tagOptions} // Options to display in the dropdown
          selectedValues={selectedTags} // Preselected value to persist in dropdown
          displayValue="name" // Property name to display in the dropdown options
          keepSearchTerm={false}
          onSearch={handleTagSearch} // Function will trigger on input change
          onSelect={handleTagSelect} // Function will trigger on select event
          onRemove={handleTagRemove} // Function will trigger on remove event
          emptyRecordMsg={<p>{newTagOption} <button onClick={createNewTag} className="btn btn-sm btn-primary">create tag</button></p>} // displays if the tag doesn't exist in DB
          closeIcon="circle"
        />
  

        {/* <select onChange={selectTeam}>
          {_teams.map((team) => (
            <option value={team._id} key={team._id}>{team.name}</option>
          ))}
        </select> */}

        <button onClick={handleClick} className="btn btn-lg btn-info" style={{marginTop: "100px"}}>
          Create Resource
        </button>
      </form>
    </div>
  );
}

export {CreateResource};
