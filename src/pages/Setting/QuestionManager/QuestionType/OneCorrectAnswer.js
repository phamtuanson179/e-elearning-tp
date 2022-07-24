import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MKButton from "components/MKButton";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import TPNotification from "components/TPNotification";
import { NOTIFICATION } from "constants/notification";
import { QUESTION_TYPE } from "constants/questionType";
import { isEmpty } from "lodash";

const yupSchema = yup.object().shape({
  content: yup.string().required("Trường này bắt buộc!"),
  ans0: yup.string().required("Trường này bắt buộc!"),
  ans1: yup.string().required("Trường này bắt buộc!"),
  ans2: yup.string().required("Trường này bắt buộc!"),
  ans3: yup.string().required("Trường này bắt buộc!"),
  correctAnswerIndex: yup.string().required("Cần chọn một câu trả lời đúng!"),
});

export const OneCorrectAnswer = ({
  typeQuestion,
  questionList,
  setQuestionList,
  setIsOpenAddQuestionModal,
}) => {
  const { handleSubmit, control, reset, setValue, getValues } = useForm();

  const onSubmit = (data) => {
    const newQuestion = {
      content: data.content,
      type: typeQuestion,
      url_file: "",
      correctAnswerIndex: data.correctAnswerIndex,
      correctAnswerList: data.correctAnswerList,
      answers: handleAnwsers([data.ans0, data.ans1, data.ans2, data.ans3]),
    };
    setQuestionList([...questionList, newQuestion]);
    setIsOpenAddQuestionModal(false);
    reset({});
    // setValue();
  };

  const handleCloseAddQuestionModal = () => {
    setIsOpenAddQuestionModal(false);
  };

  const handleAnwsers = (answerList) => {
    const correctAnswerIndex = getValues("correctAnswerIndex");

    let answers = [];
    for (let i = 0; i < answerList.length; i++) {
      let answer = {
        content: answerList[i],
        is_correct: correctAnswerIndex == i ? true : false,
        url_file: null,
      };
      answers.push(answer);
    }
    return answers;
  };

  return (
    <Box
      className='answer-type-many-correct-answer__section'
      sx={{ padding: 2 }}
    >
      <TextField
        id='standard-basic'
        label='Câu hỏi'
        sx={{ width: "100%", marginBottom: 3 }}
        variant='standard'
      />
      <RadioGroup>
        <Box
          sx={{
            display: "flex",
            marginBottom: 1,
            alignItems: "center",
          }}
        >
          <FormControlLabel
            value='0'
            control={<Radio />}
            label=''
            sx={{ width: 32, height: 32, padding: 0 }}
          />

          <TextField
            id='standard-basic'
            label='Câu trả lời thứ nhất'
            sx={{ width: "100%" }}
            variant='standard'
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            marginBottom: 1,
            alignItems: "center",
          }}
        >
          <FormControlLabel
            value='1'
            control={<Radio />}
            label=''
            sx={{ width: 32, height: 32, padding: 0 }}
          />

          <TextField
            id='standard-basic'
            label='Câu trả lời thứ hai'
            sx={{ width: "100%" }}
            variant='standard'
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            marginBottom: 1,
            alignItems: "center",
          }}
        >
          <FormControlLabel
            value='2'
            control={<Radio />}
            label=''
            sx={{ width: 32, height: 32, padding: 0 }}
          />
          <TextField
            id='standard-basic'
            label='Câu trả lời thứ ba'
            sx={{ width: "100%" }}
            variant='standard'
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            marginBottom: 1,
            alignItems: "center",
          }}
        >
          <FormControlLabel
            value='3'
            control={<Radio />}
            label=''
            sx={{ width: 32, height: 32, padding: 0 }}
          />
          <TextField
            id='standard-basic'
            label='Câu trả lời thứ tư'
            sx={{ width: "100%" }}
            variant='standard'
          />
        </Box>
      </RadioGroup>
    </Box>
  );
};

export default OneCorrectAnswer;
