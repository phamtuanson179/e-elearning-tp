import { Box, Typography } from "@mui/material";
import subjectAPI from "api/subjectAPI";
import userAPI from "api/userApi";
import { MODAL_TYPE } from "constants/type";
import { useEffect, useState } from "react";
import MKBox from "../../../components/MKBox";
import UserModal from "./UserModal";
import SubjectModal from "./UserModal";
import UserTable from "./UserTable";
import SubjectTable from "./UserTable";

const UserManager = () => {
  const [listSubjects, setListSubjects] = useState();
  const [listUsers, setListUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [isOpenDetailExamModal, setIsOpenDetailExamModal] = useState(false);
  const [isLoadSubjectAgain, setIsLoadSubjectAgain] = useState(true);

  const convertUsers = () => {
    const listUserConverted = listUsers?.map((item) => ({
      ...item,
      list_subjects: item?.list_subjects_id.map((subject_id) =>
        findSubjectById(subject_id)
      ),
    }));
    setListUsers(listUserConverted);
  };

  const findSubjectById = (subjectId) => {
    return listSubjects?.find((item) => item.id == subjectId);
  };

  const getAllSubject = async () => {
    await subjectAPI.getAll().then((res) => {
      if (res?.status == 200) {
        setListSubjects(res?.data);
        setLoading(false);
      }
    });
  };

  const getUserForUser = async () => {
    await userAPI.getUserForUser().then((res) => {
      if (res?.status == 200) {
        setListUsers(res?.data);
        getAllSubject();
      }
    });
  };

  useEffect(() => {
    convertUsers();
  }, [listSubjects]);

  useEffect(() => {
    if (isLoadSubjectAgain) {
      getUserForUser();
      setIsLoadSubjectAgain(false);
    }
  }, [isLoadSubjectAgain]);

  return (
    <MKBox>
      <Box
        className='title__box'
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant='h5' component={"div"}>
          Quản lý người dùng
        </Typography>
        <UserModal
          listSubjects={listSubjects}
          modalType={MODAL_TYPE.ADD}
          setIsLoadSubjectAgain={setIsLoadSubjectAgain}
        ></UserModal>
      </Box>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        {loading ? null : (
          <UserTable
            setIsLoadSubjectAgain={setIsLoadSubjectAgain}
            listUsers={listUsers}
            listSubjects={listSubjects}
          ></UserTable>
        )}
      </Box>
    </MKBox>
  );
};

export default UserManager;
