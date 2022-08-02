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
import { MODAL_TYPE } from "constants/type";

export const OneCorrectAnswer = ({
  modalType,
  curQuestion,
  setCurQuestion,
}) => {
  const { handleSubmit, control, reset, setValue, getValues } = useForm();

  const onChangeTitle = (e) => {
    setCurQuestion({ ...curQuestion, title: e.target.value });
  };

  const onChangeCorrectAnswer = (e) => {
    setCurQuestion({ ...curQuestion, correctAnswer: e.target.value });
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
        value={curQuestion?.title}
        onChange={onChangeTitle}
      />
      <RadioGroup
        value={curQuestion?.correctAnswer}
        onChange={onChangeCorrectAnswer}
      >
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
            value={curQuestion?.ans0}
            onChange={(e) =>
              setCurQuestion({ ...curQuestion, ans0: e.target.value })
            }
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
            value={curQuestion?.ans1}
            onChange={(e) =>
              setCurQuestion({ ...curQuestion, ans1: e.target.value })
            }
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
            value={curQuestion?.ans2}
            onChange={(e) =>
              setCurQuestion({ ...curQuestion, ans2: e.target.value })
            }
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
            value={curQuestion?.ans3}
            onChange={(e) =>
              setCurQuestion({ ...curQuestion, ans3: e.target.value })
            }
          />
        </Box>
      </RadioGroup>
    </Box>
  );
};

export default OneCorrectAnswer;
