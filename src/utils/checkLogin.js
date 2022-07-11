import { isEmpty } from "lodash";

const checkLogin = () => {
  if (!isEmpty(localStorage.getItem("token"))) return true;
  return false;
};

export default checkLogin;
