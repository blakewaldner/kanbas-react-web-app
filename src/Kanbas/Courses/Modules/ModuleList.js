import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
} from "./modulesReducer";
function ModuleList() {
    const { courseId } = useParams();
    const modules = useSelector((state) => state.modulesReducer.modules);
    const module = useSelector((state) => state.modulesReducer.module);
    const dispatch = useDispatch();
    return (
        <ul className="list-group">
            <li className="list-group-item">
                <textarea
                    class="form-control"
                    value={module.name}
                    onChange={(e) =>
                        dispatch(setModule({ ...module, name: e.target.value }))
                    } />
                <br />
                <textarea
                    class="form-control"
                    value={module.description}
                    onChange={(e) =>
                        dispatch(setModule({ ...module, description: e.target.value }))
                    } />
                <br />
                <button class="btn btn-success float-end ms-3"
                    onClick={() => dispatch(addModule({ ...module, course: courseId }))}>
                    Add
                </button>

                <button class="btn btn-primary float-end"
                    onClick={() => dispatch(updateModule(module))}>
                    Update
                </button>


            </li>
            <br/>
            {modules
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                    <li key={index} className="list-group-item">
                         
                        <button class="btn btn-success float-end ms-3"
                            onClick={() => dispatch(setModule(module))}>
                            Edit
                        </button>
                        <button class="btn btn-danger float-end ms-3"
                            onClick={() => dispatch(deleteModule(module._id))}>
                            Delete
                        </button>
                        <h3>{module.name}</h3>
                        <p>{module.description}</p>
                        <p>{module._id}</p>
                    </li>
                ))}
        </ul>
    );
}
export default ModuleList;