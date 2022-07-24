import { Box, CircularProgress } from "@mui/material";
import subjectAPI from "api/subjectAPI";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { STATUS } from "./constant";
import "./subject.scss";
import QuestionDetail from "./QuestionDetail";
import QuestionNavbar from "./QuestionNavbar";
import questionAPI from "api/questionAPI";

const convertDatas = (datas) => {
  const result = datas?.map((data, idx) => {
    return {
      ...data,
      idx: idx,
      status: STATUS.NORESPONSE,
      curAnswer: -1,
      curAnswerList: Array(4).fill(false),
    };
  });
  return result;
};

const subject = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState();
  const [questionAmount, setQuestionAmount] = useState(0);
  const [curQuestion, setCurQuestion] = useState("");
  const [curIndexQuestion, setCurIndexQuestion] = useState(0);
  const [nameTest, setNameTest] = useState("");
  const [minCorrectQuestionToPass, setMinCorrectQuestionToPass] = useState();
  const [startCountDown, setStartCountDown] = useState(false);
  const [subject, setSubject] = useState();
  const [isFinish, setIsFinish] = useState(false);
  // const [curQuestionType, setCurQuestionType] = useState();
  const searchQuestionByIdx = (id, questions) => {
    if (questions) {
      for (let question of questions) {
        if (question?.idx == id) {
          setCurQuestion(question);
          // setCurQuestionType(question?.type);
          break;
        }
      }
    }
  };

  // ham luu lai cau tra loi moi khi nguoi dung chon cau tra loi khac
  const saveAnswerOfQuestion = (question, listQuestions) => {
    if (questions) {
      let curQuestions = [...listQuestions];
      curQuestions[question.idx] = question;
      setQuestions(curQuestions);
    }
  };

  // call API
  useEffect(() => {
    // getsubject(location?.state?.subject);
    const subject = location.state?.subject;
    getQuestions({ id: subject.id });
    setSubject(subject);
    setNameTest(subject?.name);
    setMinCorrectQuestionToPass(subject?.min_correct_question_to_pass);
    setQuestionAmount(subject.amount_question);
    // startCountDown(countDown);
  }, []);

  // tim cau hoi voi moi lua chon so cau
  useEffect(() => {
    saveAnswerOfQuestion(curQuestion, questions);
    searchQuestionByIdx(curIndexQuestion, questions);
  }, [curIndexQuestion, isFinish]);

  const getQuestions = async (subject_id) => {
    await questionAPI.getRandomQuestions(subject_id).then((res) => {
      const res_questions = convertDatas(res.data);
      setQuestions(res_questions);
      setCurQuestion(res_questions[0]);
    });
  };

  return (
    <Box className='subject__container'>
      <Box className='subject__container--left'>
        <QuestionNavbar
          questionAmount={questionAmount}
          setCurIndexQuestion={setCurIndexQuestion}
          curIndexQuestion={curIndexQuestion}
          curQuestion={curQuestion}
          questions={questions}
        />
      </Box>
      <Box className='subject__container--right' sx={{ height: "100%" }}>
        <QuestionDetail
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
          nameTest={nameTest}
          startCountDown={startCountDown}
          setStartCountDown={setStartCountDown}
          questions={questions}
          time={location.state?.subject?.time}
          minCorrectQuestionToPass={minCorrectQuestionToPass}
          questionAmount={questionAmount}
          subject={subject}
          isFinish={isFinish}
          setIsFinish={setIsFinish}
        />
      </Box>
    </Box>
  );
};

export default subject;
