import React from "react";
import github from "./db.js";
import { useEffect, useState, useCallback } from "react";
import query from "./Query.js";

function App() {
  let [userName, setUserName] = useState('');
  let [repoList, setRepoList] = useState('');


  const fetchData = useCallback(() => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.header,
      body: JSON.stringify(query)
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        
        setUserName(viewer.name)
        setRepoList(viewer.repositories.nodes)
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    fetchData();
  },[fetchData]);



  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hey there {userName}!</p>
      <p>Bio</p>


      {
        repoList && (
          <ul className="list-group list-group-flush">
          {
            repoList.map((repo) => (
              <li className="list-group-item" key={repo.id.toString()}>
              <a className="h5 mb-0 text-decoration-none" href={repo.url}>{repo.name}</a>
              </li>
            ))
          }
          </ul>
        )
      }
    </div>
  );
}

export default App;