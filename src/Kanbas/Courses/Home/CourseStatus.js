import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFile,
    faSignOutAlt,
    faPodcast,
    faChartBar,
    faBullhorn,
    faChartArea,
    faBell
} from '@fortawesome/free-solid-svg-icons';

function CourseStatus() {
  return (
    <div style={{float: 'left', margin: '15px'}}>

      <div className="icon-buttons">
        <button type="button" className="btn btn-light icon-spacing">
        <FontAwesomeIcon icon={faFile} className="grey-icon float-start" />
          Import Existing Content
        </button>
        <br/>
        <button type="button" className="btn btn-light icon-spacing">
        <FontAwesomeIcon icon={faSignOutAlt} className="grey-icon float-start" />
         Import from Commons
        </button>
        <br/>
        <button type="button" className="btn btn-light icon-spacing">
        <FontAwesomeIcon icon={faPodcast} className="grey-icon float-start" />
            Choose Home Page
        </button>
        <br/>
        <button type="button" className="btn btn-light icon-spacing">
        <FontAwesomeIcon icon={faChartBar} className="grey-icon float-start" />
          View Course Stream
        </button>
        <br/>
        <button type="button" className="btn btn-light icon-spacing">
        <FontAwesomeIcon icon={faBullhorn} className="grey-icon float-start" />
          New Announcement
        </button>
        <br/>
        <button type="button" className="btn btn-light icon-spacing">
        <FontAwesomeIcon icon={faChartArea} className="grey-icon float-start" />
          New Analytics
        </button>
        <br/>
        <button type="button" className="btn btn-light icon-spacing">
        <FontAwesomeIcon icon={faBell} className="grey-icon float-start" />
          View Course Notifications
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
