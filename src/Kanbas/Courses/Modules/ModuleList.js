import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules
} from "./modulesReducer";
import { findModulesForCourse, createModule } from "./client";
import * as client from "./client";
function ModuleList() {
    const { courseId } = useParams();
    useEffect(() => {
        findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);
    const handleDeleteModule = (moduleId) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };
    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };
    const handleAddModule = () => {
        createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };
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
                    onClick={handleAddModule}>
                    Add
                </button>

                <button class="btn btn-primary float-end"
                    onClick={handleUpdateModule}>
                    Update
                </button>


            </li>
            <br />
            {modules
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                    <li key={index} className="list-group-item">

                        <button class="btn btn-success float-end ms-3"
                            onClick={() => dispatch(setModule(module))}>
                            Edit
                        </button>
                        <button class="btn btn-danger float-end ms-3"
                            onClick={() => handleDeleteModule(module._id)}>
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