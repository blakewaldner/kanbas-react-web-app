import React from "react";
import EncodingParametersInURLs from "./EncodingParametersInURLs";
import WorkingWithObjects from "./WorkingWIthObjects";
import WorkingWithArrays from "./WorkingWithArrays";

function Assignment5() {
  const API_BASE = process.env.REACT_APP_API_BASE;
  const URL = `${API_BASE}/a5/welcome`;
    return (
      <div>
        <h1>Assignment 5</h1>
        <div className="list-group">
          <a href={URL}
             className="list-group-item">
            Welcome
          </a>
          <WorkingWithArrays/>
          <WorkingWithObjects/>
          <EncodingParametersInURLs/>

        </div>
      </div>
    );
  }
  export default Assignment5;