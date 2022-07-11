import CurCourses from "pages/CurSubject";
import DetailExam from "pages/DetailSubject";
import Error404 from "pages/Error/Error404";
import Exam from "pages/Exam";
import ForgotPassword from "pages/ForgotPassword";
import ListExams from "pages/ListExams/ListExams";
import Setting from "pages/Setting";
import { Navigate } from "react-router-dom";
// const Setting = lazy(() => import('pages/Setting'))

// const Home = React.lazy(() => import('./pages/Home'))
// const Course = React.lazy(() => import('./pages/Course'))

const routes = [
  {
    path: "*",
    component: <Error404 />,
  },
  {
    path: "/",
    component: <Navigate to='/list-subject' />,
  },
  {
    path: "current-subject",
    component: <CurCourses />,
  },
  // {
  //   path: "all-courses",
  //   component: <AllCourses />,
  // },
  {
    path: "list-subjects",
    component: <ListExams />,
  },
  {
    path: "setting",
    component: <Setting />,
  },
  {
    path: "exam",
    component: <Exam />,
  },
  {
    path: "forgot-password",
    component: <ForgotPassword />,
  },
  {
    path: "detail-exam",
    component: <DetailExam />,
  },
];

export default routes;
