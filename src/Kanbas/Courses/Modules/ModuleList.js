import React from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";
import "./Module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';


function ModuleList() {
    const { courseId } = useParams();
    const modules = db.modules;
    return (
        <div class="module-list">
            <button type="button" className="btn btn-danger float-end button-spacing">
                <FontAwesomeIcon
                    icon={faPlus}
                />
                Module
            </button>
            <div className="dropdown float-end button-spacing">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Publish all
                </button>
            </div>
            <button type="button" className="btn btn-light float-end button-spacing">View Progress</button>
            <button type="button" className="btn btn-light float-end">Collapse All</button>
            <br />
            <br />
            
            <ul className="list-group">
                {
                    modules
                        .filter((module) => module.course === courseId)
                        .map((module, index) => (
                            <li key={index} className="list-group-item list-group-item-secondary course-spacing">
                                <h3>{module.name}</h3>
                                <p>{module.description}</p>
                            </li>
                        ))
                }
            </ul>
        </div>
    );
}
export default ModuleList;