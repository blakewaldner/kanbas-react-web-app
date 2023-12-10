import db from "../../Kanbas/Database";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import CourseNavigation from "./CourseNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Quizzes from "./Quizzes"
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import QuizEditor from "./Quizzes/quizEditor";
import QuizDetails from "./Quizzes/quizDetails";
import QuizPreview from "./Quizzes/quizPreview";


function Courses() {
  const { courseId } = useParams();
  const API_BASE = process.env.REACT_APP_API_BASE;
  const URL = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState({});
  const findCourseById = async (courseId) => {
    const response = await axios.get(
      `${URL}/${courseId}`
    );
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);
  return (
    <div>
      <h4>
        <div class="breadcrumb">
          <div class="breadcrumb-item">
            <a href="#" class="breadcrumb-link">{course._id} - {course.name}</a>
          </div>
          <div class="breadcrumb-item active">
          <Routes>
            <Route path="Home" element={<>Home</>} />
            <Route path="Modules" element={<>Modules</>} />
            <Route path="Assignments" element={<>Assignments</>} />
            <Route
              path="Assignments/:assignmentId"
              element={<>Assignment Editor</>}
            />
            <Route path="Grades" element={<>Grades</>} />
            <Route path="quizzes" element={<>Quizzes</>} />
            <Route
              path="Quizzes/:quizId"
              element={<>Quiz Details</>}
            />
              <Route
              path="Quizzes/:quizId/edit"
              element={<>Quiz Editor</>}/>
          <Route
              path="Quizzes/:quizId/preview"
              element={<>Quiz Preview</>}/>
          </Routes>
          </div>
        </div>
      </h4>
      <hr/>
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{
            left: "320px",
            top: "50px",
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home/>} />
            <Route path="Modules" element={<Modules/>} />
            <Route path="Assignments" element={<Assignments/>} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor/>}/>
            <Route path="Grades" element={<h1>Grades</h1>} />
            <Route path="Quizzes" element={<Quizzes/>}/>
            <Route
              path="Quizzes/:quizId"
              element={<QuizDetails/>}/>
              <Route
              path="Quizzes/:quizId/edit"
              element={<QuizEditor/>}/>
              <Route
              path="Quizzes/:quizId/preview"
              element={<QuizPreview/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Courses;