import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFile
} from '@fortawesome/free-solid-svg-icons';

function CourseStatus() {
  return (
    <div style={{float: 'left', margin: '15px'}}>

      <div className="icon-buttons">
        <button type="button" className="btn btn-light icon-spacing">
          <i className="fa fa-file grey-icon"></i> Import Existing Content
        </button>
        <br/>
        <button type="button" className="btn btn-light icon-spacing">
          <i className="fa fa-sign-out-alt grey-icon"></i> Import from Commons
        </button>
        <br/>
        <button type="button" className="btn btn-light icon-spacing">
          <i className="fa fa-podcast grey-icon"></i> Choose Home Page
        </button>
        <br/>
        <button type="button" className="btn btn-light icon-spacing">
          <i className="fa fa-chart-bar grey-icon"></i> View Course Stream
        </button>
        <br/>
        <button type="button" className="btn btn-light icon-spacing">
          <i className="fa fa-bullhorn grey-icon"></i> New Announcement
        </button>
        <br/>
        <button type="button" className="btn btn-light icon-spacing">
          <i className="fa fa-chart-area grey-icon"></i> New Analytics
        </button>
        <br/>
        <button type="button" className="btn btn-light icon-spacing">
          <i className="fa fa-bell grey-icon"></i> View Course Notifications
        </button>
        <br/>
      </div>

      <h2>Todo</h2>
      <hr />
      <i className="fa fa-times-circle red-icon"></i>
      <a href="#" className="breadcrumb-link">Grade A1 - ENV + HTML</a>
      <div>100 points • Sep 18 at 11:59pm</div>
      <i className="fa fa-times-circle red-icon"></i>
      <a href="#" className="breadcrumb-link">Grade A2 - CSS + Bootstrap</a>
      <div>100 points • Oct 2 at 11:59pm</div>

    </div>
  );
}

export default CourseStatus;
