import PersonalInfo from "./PersonalInfo";
import ManageExams from "./ManageExams";
import SubjectManager from "./SubjectManager";
import QuestionManager from "./QuestionManager";
import ResultManager from "./ResultManager";
import UserManager from "./UserManager";

export const MENUBAR_ADMIN = [
  {
    name: "Thông tin cá nhân",
    component: <PersonalInfo />,
    href: "setting/personal-info",
  },
  {
    name: "Quản lý bài thi",
    component: <ResultManager />,
  },
  {
    name: "Quản lý môn học",
    component: <SubjectManager />,
  },
  {
    name: "Quản lý câu hỏi",
    component: <QuestionManager />,
  },
  {
    name: "Quản lý người dùng",
    component: <UserManager />,
  },
];

export const MENUBAR_STUDENT = [
  {
    name: "Thông tin cá nhân",
    component: <PersonalInfo />,
    href: "setting/personal-info",
  },
];

export const MENUBAR_TEACHER = [
  {
    name: "Thông tin cá nhân",
    component: <PersonalInfo />,
    href: "setting/personal-info",
  },
  {
    name: "Quản lý bài thi",
    component: <ResultManager />,
  },
  {
    name: "Quản lý câu hỏi",
    component: <QuestionManager />,
  },
  {
    name: "Quản lý người dùng",
    component: <UserManager />,
  },
];
