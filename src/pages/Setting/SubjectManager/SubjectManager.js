import { Box, Typography } from "@mui/material";
import subjectAPI from "api/subjectAPI";
import { MODAL_TYPE } from "constants/type";
import { useEffect, useState } from "react";
import MKBox from "../../../components/MKBox";
import SubjectModal from "./SubjectModal";
import SubjectTable from "./SubjectTable";

const SubjectManager = () => {
  const [listSubjects, setListSubjects] = useState();
  const [loading, setLoading] = useState(true);
  const [isOpenDetailExamModal, setIsOpenDetailExamModal] = useState(false);
  const [exam, setExam] = useState("");
  const [isLoadSubjectAgain, setIsLoadSubjectAgain] = useState(true);

  const getAllSubject = async () => {
    await subjectAPI.getAll().then((res) => {
      if (res?.status == 200) {
        setListSubjects(res?.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (isLoadSubjectAgain) {
      getAllSubject();
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
          Quản lý môn học
        </Typography>
        <SubjectModal
          modalType={MODAL_TYPE.ADD}
          setIsLoadSubjectAgain={setIsLoadSubjectAgain}
        ></SubjectModal>
      </Box>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        {loading ? null : (
          <SubjectTable
            setIsLoadSubjectAgain={setIsLoadSubjectAgain}
            listSubjects={listSubjects}
          ></SubjectTable>
        )}
      </Box>
    </MKBox>
  );
};

export default SubjectManager;
