import ModuleList from "../Modules/ModuleList";
import CourseStatus from "./CourseStatus.js"

function Home() {
  return (
    <div class="d-flex">
      <ModuleList />
      <CourseStatus />
    </div>
  );
}
export default Home;