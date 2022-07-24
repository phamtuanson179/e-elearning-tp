import { Box, Typography } from "@mui/material";
import questionAPI from "api/questionAPI";
import subjectAPI from "api/subjectAPI";
import { MODAL_TYPE } from "constants/type";
import { useEffect, useState } from "react";
import MKBox from "../../../components/MKBox";
import QuestionModal from "./QuestionModal";
import QuestionTable from "./QuestionTable";

const QuestionManager = () => {
  const [listSubjects, setListSubjects] = useState();
  const [listQuestions, setListQuestions] = useState();
  const [loading, setLoading] = useState(true);
  const [isLoadSubjectAgain, setIsLoadSubjectAgain] = useState(true);

  const convertQuestions = () => {
    const listQuestionsConverted = listQuestions?.map((item) => ({
      ...item,
      subject: findSubjectById(item.subject_id),
    }));
    setListQuestions(listQuestionsConverted);
  };

  const findSubjectById = (subjectId) => {
    return listSubjects.find((item) => item.id == subjectId);
  };

  const getAllSubject = async () => {
    await subjectAPI.getAll().then((res) => {
      if (res?.status == 200) {
        setListSubjects(res?.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    convertQuestions();
  }, [listSubjects]);

  const getAllQuestion = async () => {
    await questionAPI.getAll().then((res) => {
      if (res?.status == 200) {
        setListQuestions(res?.data);
        getAllSubject();
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (isLoadSubjectAgain) {
      getAllQuestion();
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
          Quản lý câu hỏi
        </Typography>
        <QuestionModal
          modalType={MODAL_TYPE.ADD}
          setIsLoadSubjectAgain={setIsLoadSubjectAgain}
        ></QuestionModal>
      </Box>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        {loading ? null : (
          <QuestionTable
            setIsLoadSubjectAgain={setIsLoadSubjectAgain}
            listSubjects={listSubjects}
            listQuestions={listQuestions}
          ></QuestionTable>
        )}
      </Box>
    </MKBox>
  );
};

export default QuestionManager;
