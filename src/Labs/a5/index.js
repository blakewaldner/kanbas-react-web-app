import React from "react";
import EncodingParametersInURLs from "./EncodingParametersInURLs";
import WorkingWithObjects from "./WorkingWIthObjects";
import WorkingWithArrays from "./WorkingWithArrays";

function Assignment5() {
    return (
      <div>
        <h1>Assignment 5</h1>
        <div className="list-group">
          <a href="http://localhost:4000/a5/welcome"
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