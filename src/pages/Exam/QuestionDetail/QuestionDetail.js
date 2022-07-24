import { Box, Typography } from "@mui/material";
import { QUESTION_TYPE } from "constants/questionType";
import { useEffect, useState } from "react";
import { convertSecondToTime } from "../../../utils/convert";
import ResultModal from "../ResultModal";
import ManyCorrectAnswer from "./QuestionType/ManyCorrectAnswer";
import OneCorrectAnswer from "./QuestionType/OneCorrectAnswer";
import TrueFalseAnswer from "./QuestionType/TrueFalseAnswer";

const QuestionDetail = ({
  curQuestion,
  setCurQuestion,
  nameTest,
  questions,
  time,
  minCorrectQuestionToPass,
  questionAmount,
  isFinish,
  setIsFinish,
  subject,
}) => {
  const [showModalResult, setShowModalResult] = useState(false);
  const [countDown, setCountDown] = useState(time);
  const [timeString, setTimeString] = useState("00:00");

  useEffect(() => {
    if (!isFinish) {
      if (countDown < 0) {
        setTimeString("00:00");
        setIsFinish(true);
      } else {
        setTimeout(() => {
          const time = convertSecondToTime(countDown);
          setTimeString(`${time.minutes}:${time.seconds}`);
          setCountDown(countDown - 1);
        }, 1000);
        return;
      }
    }
  }, [countDown]);

  useEffect(() => {
    if (isFinish) {
      setShowModalResult(true);
    }
  }, [questions]);

  const renderQuestion = () => {
    if (curQuestion.type === QUESTION_TYPE.MANY_CORRECT_ANSWERS)
      return (
        <ManyCorrectAnswer
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
        />
      );
    else if (curQuestion.type === QUESTION_TYPE.ONE_CORRECT_ANSWER)
      return (
        <OneCorrectAnswer
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
        />
      );
    else if (curQuestion.type === QUESTION_TYPE.TRUE_FALSE_ANSWERS)
      return (
        <TrueFalseAnswer
          curQuestion={curQuestion}
          setCurQuestion={setCurQuestion}
        />
      );
  };

  return (
    <Box>
      <Box className='detail__question'>
        <Typography component={"div"} variant='h5' className='name__test'>
          {nameTest ? nameTest : ""}
        </Typography>
        <Typography
          component={"div"}
          variant='h5'
          className='countdown__oclock'
        >
          Thời gian: {timeString}
        </Typography>

        <ResultModal
          showModalResult={showModalResult}
          setShowModalResult={setShowModalResult}
          questions={questions}
          questionAmount={questionAmount}
          minCorrectQuestionToPass={minCorrectQuestionToPass}
          isFinish={isFinish}
          setIsFinish={setIsFinish}
          countDown={countDown}
          time={time}
          subject={subject}
        />
      </Box>
      {/* ádfádfádfsadfads */}
      {renderQuestion()}
    </Box>
  );
};

export default QuestionDetail;
