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

export const OneCorrectAnswer = ({ question }) => {
  const userAnswerIndex = question.user_answers[0];
  const correctAnswerIndex = question.answers.findIndex(
    (item) => item.is_correct == true
  );
  return (
    <Box
      className=' border border-dark row'
      sx={{
        margin: "0.5rem",
        padding: "0.5rem",
        borderRadius: "1rem",
      }}
    >
      <Box>
        <Typography
          component={"div"}
          className='title__question'
          variant='h5'
          fontWeight={700}
          marginBottom={1}
        >
          {question.title}
        </Typography>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          value={userAnswerIndex}
          name='radio-buttons-group'
          sx={{ marginLeft: 1 }}
        >
          {question?.answers?.map(
            (answer, idx) =>
              idx == correctAnswerIndex ? (
                <FormControlLabel
                  value={idx}
                  key={idx}
                  label={
                    <div class='alert alert-success w-100' role='alert'>
                      {answer.content}
                    </div>
                  }
                  control={<Radio />}
                />
              ) : (idx == userAnswerIndex &&
                  userAnswerIndex != correctAnswerIndex) ||
                userAnswerIndex == null ? (
                <FormControlLabel
                  value={idx}
                  key={idx}
                  label={
                    <div class='alert alert-danger w-100' role='alert'>
                      {answer.content}
                    </div>
                  }
                  control={<Radio />}
                />
              ) : (
                <FormControlLabel
                  value={idx}
                  key={idx}
                  label={
                    <Typography
                      sx={{ display: "inline" }}
                      variant='body2'
                      fontWeight={400}
                    >
                      {answer.content}
                    </Typography>
                  }
                  control={<Radio />}
                />
              )
            // <div class='alert alert-danger w-100' role='alert'>
            //   {answer.content}
            // </div>
          )}
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default OneCorrectAnswer;
