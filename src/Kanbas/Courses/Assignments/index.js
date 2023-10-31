import React from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../Database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisV,
    faPlus,
    faCheckCircle,
    faEdit,
} from '@fortawesome/free-solid-svg-icons';


function Assignments() {
    const { courseId } = useParams();
    const assignments = db.assignments;
    const courseAssignments = assignments.filter(
        (assignment) => assignment.course === courseId);
    return (
        <div class="half-width">
            <input type="text" class="form-control input-sizing float-start" placeholder="Search for Assignment"
            ></input>
            <button type="button" class="btn btn-light float-end button-spacing">
                <FontAwesomeIcon
                    icon={faEllipsisV}
                />
            </button>
            <button type="button" class="btn btn-danger float-end button-spacing">
                <i class="fa fa-plus"></i>
                Assignment
            </button>
            <button type="button" class="btn btn-light float-end button-spacing">
                <i class="fa fa-plus"></i>
                Group
            </button>
            <br />
            <br />
            <ul class="list-group">
                <li class="list-group-item list-group-item-secondary">
                    <div class="bold-font">
                        Assignments
                        <FontAwesomeIcon icon={faEllipsisV} className="float-end ms-3" />
                        <FontAwesomeIcon icon={faPlus} className="grey-icon float-end ms-3" />
                        <FontAwesomeIcon icon={faCheckCircle} className="green-icon float-end ms-3" />
                    </div>
                </li>
                {courseAssignments.map((assignment) => (
                <li key={assignment._id} className="list-group-item green-border">
                    <FontAwesomeIcon icon={faEdit} className="float-start green-large-icon me-3" />
                    <div className="ms-5">
                    <FontAwesomeIcon icon={faEllipsisV} className="float-end ms-3" />
                    <FontAwesomeIcon icon={faCheckCircle} className="green-icon float-end ms-3" />
                        <h5>
                            <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} className="no-underline-gray">
                                {assignment.title}
                            </Link>
                        </h5>
                        
                    </div>
                </li>
            ))}
            </ul>

        </div>
    );
}
export default Assignments;