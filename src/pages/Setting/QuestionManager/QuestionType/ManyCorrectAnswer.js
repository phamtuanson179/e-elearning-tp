import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import MKButton from "components/MKButton";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

export const ManyCorrectAnswer = ({
  typeQuestion,
  questionList,
  setQuestionList,
  setIsOpenAddQuestionModal,
}) => {
  const { handleSubmit, control, reset, setValue, getValues } = useForm();

  const [stateCheckBoxList, setStateCheckBoxList] = useState(
    Array(4).fill(false)
  );

  const onChangeCheckbox = (idx) => {
    let datas = [...stateCheckBoxList];
    datas[idx] = !datas[idx];
    setStateCheckBoxList(datas);

    setValue(
      "correctAnswerList",
      datas
        .map((data, idx) => {
          if (data === true) return true;
        })
        .filter((data) => {
          return data !== undefined;
        })
    );
  };

  const onSubmit = (data) => {
    const newQuestion = {
      content: data.content,
      type: typeQuestion,
      url_file: "",
      correctAnswerIndex: "",
      correctAnswerList: data.correctAnswerList,
      answers: handleAnwsers([data.ans0, data.ans1, data.ans2, data.ans3]),
    };
    setQuestionList([...questionList, newQuestion]);

    setIsOpenAddQuestionModal(false);
    reset({});
    setStateCheckBoxList(Array(4).fill(false));
    // setValue();
  };

  const handleCloseAddQuestionModal = () => {
    setIsOpenAddQuestionModal(false);
  };

  const handleAnwsers = (answerList) => {
    let answers = [];
    for (let i = 0; i < answerList.length; i++) {
      let answer = {
        content: answerList[i],
        is_correct: stateCheckBoxList[i] === true ? true : false,
        url_file: null,
      };
      answers.push(answer);
    }
    return answers;
  };

  return (
    <Box className='answer-type-many-correct-answer__section'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='content'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                id='standard-basic'
                label='Câu hỏi'
                sx={{ width: "100%", marginBottom: 3 }}
                variant='standard'
                {...field}
              />
            );
          }}
        />

        <FormGroup>
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
              width: "100%",
            }}
            control={
              <Checkbox
                checked={stateCheckBoxList[0]}
                onChange={() => {
                  onChangeCheckbox(0);
                }}
              />
            }
            label={
              <Controller
                name='ans0'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu trả lời thứ nhất'
                      autoComplete={false}
                      sx={{ width: "100%", marginBottom: 1, flex: 1 }}
                      variant='standard'
                      {...field}
                    />
                  );
                }}
              />
            }
          />
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
            }}
            control={
              <Checkbox
                checked={stateCheckBoxList[1]}
                onChange={() => {
                  onChangeCheckbox(1);
                }}
              />
            }
            label={
              <Controller
                name='ans1'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu trả lời thứ hai'
                      autoComplete={false}
                      sx={{ width: "100%", marginBottom: 1 }}
                      variant='standard'
                      {...field}
                    />
                  );
                }}
              />
            }
          />
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
            }}
            control={
              <Checkbox
                checked={stateCheckBoxList[2]}
                onChange={() => {
                  onChangeCheckbox(2);
                }}
              />
            }
            label={
              <Controller
                name='ans2'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu trả lời thứ ba'
                      autoComplete={false}
                      sx={{ width: "100%", marginBottom: 1 }}
                      variant='standard'
                      {...field}
                    />
                  );
                }}
              />
            }
          />
          <FormControlLabel
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: 0,
              marginBottom: 0,
            }}
            control={
              <Checkbox
                checked={stateCheckBoxList[3]}
                onChange={() => {
                  onChangeCheckbox(3);
                }}
              />
            }
            label={
              <Controller
                name='ans3'
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id='standard-basic'
                      label='Câu trả lời thứ tư'
                      autoComplete={false}
                      sx={{ width: "100%", marginBottom: 1 }}
                      variant='standard'
                      {...field}
                    />
                  );
                }}
              />
            }
          />
        </FormGroup>
      </form>
    </Box>
  );
};

export default ManyCorrectAnswer;
