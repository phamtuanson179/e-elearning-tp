import PersonalInfo from "./PersonalInfo";
import ManageExams from "./ManageExams";
import SubjectManager from "./SubjectManager";
import QuestionManager from "./QuestionManager";

export const MENUBAR_ADMIN = [
  {
    name: "Thông tin cá nhân",
    component: <PersonalInfo />,
    href: "setting/personal-info",
  },

  {
    name: "Quản lý bài thi",
    component: <ManageExams />,
  },
  {
    name: "Quản lý môn học",
    component: <SubjectManager />,
    href: "setting/subject-manager",
  },
  {
    name: "Quản lý câu hỏi",
    component: <QuestionManager />,
    href: "setting/question-manager",
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
    component: <ManageExams />,
  },
];
