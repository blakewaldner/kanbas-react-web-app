import { Link, useParams, useLocation } from "react-router-dom";
import './CourseNavigation.css';


function CourseNavigation() {
    const links = [
        { name: "Home", path: "home"},
        { name: "Modules", path: "modules" },
        { name: "Piazza", path: "piazza" },
        { name: "Zoom Meetings", path: "zoom-meetings" },
        { name: "Assignments", path: "assignments" },
        { name: "Quizzes", path: "quizzes" },
        { name: "Grades", path: "grades" },
        { name: "People", path: "people" },
        { name: "Panopto Video", path: "panopto-video" },
        { name: "Discussions", path: "discussions" },
        { name: "Announcements", path: "announcements" },
        { name: "Pages", path: "pages" },
        { name: "Files", path: "files" },
        { name: "Rubrics", path: "rubrics" },
        { name: "Outcomes", path: "outcomes" },
        { name: "Collaborations", path: "collaborations" },
        { name: "Syllabus", path: "syllabus" },
        { name: "Progress Reports (EAB Navigate)", path: "progress-reports" },
        { name: "Settings", path: "settings" },
      ];
  const { courseId } = useParams();
  const { pathname } = useLocation();
  return (
    <div className="course-nav">
      {links.map((link, index) => (
        <Link
          key={index}
          to={`../Courses/${courseId}/${link.path}`}
          className={`course-nav-item ${pathname.toLowerCase().includes(`/courses/${courseId}/${link.path}`.toLowerCase()) ? 'selected' : ''}`}>
          <div className="link-text">
            {link.name}
          </div>
        </Link>
      ))}
    </div>
  );
}


export default CourseNavigation;