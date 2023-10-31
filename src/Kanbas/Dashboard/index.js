import { Link } from "react-router-dom";
import db from "../Database";
function Dashboard() {
    const courses = db.courses;
    const colors = ['#0D6EFD', '#6C757D', '#198754', '##DC3545', '##FFC107', '#0DCAF0', '#F8F9FA'];
    return (
        <div className="body" style={{ width: '150%' }}>
            <h1>Dashboard</h1>
            <hr />
            <h2>Published Courses ({courses.length})</h2>
            <hr />

            <div className="d-flex flex-row flex-wrap">
                {courses.map((course, index) => (
                    <Link key={course._id} to={`../courses/${course._id}`} className="dashboard-card" style={{ textDecoration: 'none', margin: '10px' }}>
                        <div className="card">
                            <div className="card-header" style={{ height: '150px', backgroundColor: colors[index % colors.length] }}></div>
                            <div className="card-body">
                                <h5 className="card-title">{course.number} {course.name}</h5>
                                <h6 className="card-title">{course._id}</h6>
                                <p className="card-text">{course.startDate} to {course.endDate}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Dashboard;