import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Body.css";

function Body() {
  const [input, setInput] = useState("");
  const [repos, setRepo] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.github.com/search/repositories?q={language=Python&sort=updated_at&order=desc"
      )
      .then((response) => {
        setRepo(response.data.items);
      })
      .catch(() => console.log("Promise rejected"));
  }, []);

  const fetchdata = async () => {
    try {
      await axios
        .get(
          `https://api.github.com/search/repositories?q={language=${input}&sort=updated_at&order=desc}`
        )
        .then((response) => {
          setRepo(response.data.items);
        });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Server Problem");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    fetchdata();
  };
  return (
    <div className="jumbotron p-0 m-0 bg-white">
      <form
        className="d-flex justify-content-center mt-4 mb-4"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder="Search a language"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button className="btn btn-primary butt" type="submit">
          Search
        </button>
      </form>
      {repos.length !== 0 ? (
        <div className="container-fit description-box">
          {repos.slice(0, 10).map((repo, index) => (
            <div key={repo.id} className="d-flex flex-column box">
              <p className="repo_no">
                REPOSITORY <span className="no">{index + 1}</span>
              </p>
              <div className="box2">
                <p>User Id : {repo.id}</p>
                <p>Name : {repo.name}</p>
                <p>Full Name : {repo.full_name}</p>
                <p>
                  URL :
                  <a href={repo.html_url} className="url">
                    {repo.html_url}
                  </a>
                </p>
                <p>Description : {repo.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Body;
