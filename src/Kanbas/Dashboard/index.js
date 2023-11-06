import { React, useState } from "react";
import { Link } from "react-router-dom";
import db from "../Database";

function Dashboard(
    { courses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse }) 
    {
    return (
        <div className="body" style={{ width: '150%' }}>
            <h1>Dashboard</h1>
            <hr />
            <h2>Published Courses ({courses.length})</h2>
            <hr />
            <h5>Course</h5>
            <input value={course.name} className="form-control"
                onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <input value={course.number} className="form-control"
                onChange={(e) => setCourse({ ...course, number: e.target.value })} />
            <input value={course.startDate} className="form-control" type="date"
                onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
            <input value={course.endDate} className="form-control" type="date"
                onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />

            <button class="btn btn-success course-spacing" onClick={addNewCourse} >
                Add
            </button>
            <button class="btn btn-primary course-spacing" onClick={updateCourse} >
                Update
            </button>
            

            <div className="list-group">
                {courses.map((course) => (
                    <Link key={course._id}
                        to={`../Courses/${course._id}`}
                        className="list-group-item">
                        {course.name}
                        <button class="btn btn-danger float-end ms-2"
                            onClick={(event) => {
                                event.preventDefault();
                                deleteCourse(course._id);
                            }}>
                            Delete
                        </button>
                        <button class="btn btn-warning float-end me-2"
                            onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                            }}>
                            Edit
                        </button>


                    </Link>
                ))}
            </div>

        </div>
    );
};
export default Dashboard;