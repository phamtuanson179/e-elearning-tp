import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import questionAPI from "api/questionAPI";
import MKButton from "components/MKButton";
import { MODAL_TYPE, QUESTION_TYPE } from "constants/type.js";
import { set } from "lodash";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import subjectAPI from "../../../api/subjectAPI";
import "./QuestionModal.js";
import OneCorrectAnswer from "./QuestionType/OneCorrectAnswer.js";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const style = {
  bgcolor: "background.paper",
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  maxWidth: "700px",
  minWidth: "600px",
  flexDirection: "column",
  borderRadius: "12px",
  bgColor: "white",
  border: "1px solid #0000003d",
};

const QuestionModal = ({
  modalType,
  question,
  listSubjects,
  setIsLoadSubjectAgain,
}) => {
  const { Option } = Select;
  const [isOpenSubjectModal, setIsOpenSubjectModal] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [questionType, setQuestionType] = useState(
    QUESTION_TYPE.ONE_CORRECT_ANSWER.BACK_END
  );

  const [curQuestion, setCurQuestion] = useState({});

  const [subjectIdOfQuestion, setSubjectIdOfQuestion] = useState("");

  const { control, handleSubmit, reset, getValues, setValue } = useForm();

  useEffect(() => {
    if (modalType == MODAL_TYPE.UPDATE) {
      const curQuestionConverted = {
        title: question?.title,
        ans0: question?.answers[0].content,
        ans1: question?.answers[1].content,
        ans2: question?.answers[2].content,
        ans3: question?.answers[3].content,
        correctAnswer: question?.answers.findIndex(
          (item) => item?.is_correct == true
        ),
      };
      setCurQuestion(curQuestionConverted);
      setQuestionType(question?.type);
      setSubjectIdOfQuestion(question?.subject_id);
    }
  }, []);

  const convertAnswerForOneCorrectAnswer = () => {
    const answers = [
      { content: curQuestion.ans0, is_correct: false },
      { content: curQuestion.ans1, is_correct: false },
      { content: curQuestion.ans2, is_correct: false },
      { content: curQuestion.ans3, is_correct: false },
    ];
    answers[parseInt(curQuestion.correctAnswer)].is_correct = true;
    return answers;
  };

  const onSubmit = async (data) => {
    const convertedAnswer = convertAnswerForOneCorrectAnswer();

    const payload = {
      subject_id: subjectIdOfQuestion,
      type: questionType,
      title: curQuestion.title,
      answers: convertedAnswer,
    };
    if (modalType == MODAL_TYPE.UPDATE) {
      const params = {
        id: question?.id,
      };
      update(params, payload);
    } else create(payload);
  };

  const create = async (payload) => {
    await questionAPI.create(payload).then((res) => {
      if (res.status == 200) {
        setIsOpenSubjectModal(false);
        setIsLoadSubjectAgain(true);
      }
    });
  };

  const update = async (params, payload) => {
    await questionAPI.update(params, payload).then((res) => {
      if (res.status == 200) {
        setIsOpenSubjectModal(false);
        setIsLoadSubjectAgain(true);
      }
    });
  };

  return (
    <Box>
      <Box textAlign={"right"}>
        {modalType == MODAL_TYPE.ADD ? (
          <MKButton
            variant='gradient'
            color='info'
            onClick={() => {
              setIsOpenSubjectModal(true);
            }}
          >
            Thêm câu hỏi
          </MKButton>
        ) : (
          <button
            className='btn text-success'
            onClick={() => {
              setIsOpenSubjectModal(true);
            }}
          >
            <EditIcon />
          </button>
        )}
      </Box>
      <Box>
        <Modal
          sx={{
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={isOpenSubjectModal}
          onClose={() => {
            setIsOpenSubjectModal(false);
          }}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Box
              display='flex'
              alginItems='center'
              justifyContent='space-between'
              sx={{ marginTop: 2, marginLeft: 2, marginRight: 2 }}
            >
              <Typography id='modal-modal-title' variant='h5'>
                {modalType == MODAL_TYPE.ADD
                  ? "Thêm câu hỏi"
                  : "Cập nhật câu hỏi"}
              </Typography>
              <CloseIcon
                fontSize='medium'
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setIsOpenSubjectModal(false);
                }}
              />
            </Box>
            <Divider sx={{ marginBottom: 0 }} />
            <Box sx={{ padding: 2, maxHeight: "80vh", overflowY: "auto" }}>
              <form onSubmit={handleSubmit(onSubmit)} id='form-create-question'>
                <FormControl fullWidth>
                  <InputLabel id='age-label'>Loại câu hỏi</InputLabel>
                  <Select
                    id='age-label'
                    sx={{ height: 45 }}
                    labelId='age-label'
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                  >
                    <MenuItem value={QUESTION_TYPE.ONE_CORRECT_ANSWER.BACK_END}>
                      {QUESTION_TYPE.ONE_CORRECT_ANSWER.VIEW}
                    </MenuItem>
                    <MenuItem
                      disabled
                      value={QUESTION_TYPE.TRUE_FALSE_ANSWER.BACK_END}
                    >
                      {QUESTION_TYPE.TRUE_FALSE_ANSWER.VIEW}
                    </MenuItem>
                    <MenuItem
                      disabled
                      value={QUESTION_TYPE.MANY_CORRECT_ANSWER.BACK_END}
                    >
                      {QUESTION_TYPE.MANY_CORRECT_ANSWER.VIEW}
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ marginTop: 2 }}>
                  <InputLabel id='subject-label'>Môn học</InputLabel>
                  <Select
                    id='subject-label'
                    sx={{ height: 45 }}
                    labelId='subject-label'
                    value={subjectIdOfQuestion}
                    onChange={(e) => setSubjectIdOfQuestion(e.target.value)}
                  >
                    {listSubjects &&
                      listSubjects.map((subject) => (
                        <MenuItem value={subject?.id}>{subject?.name}</MenuItem>
                      ))}
                  </Select>
                </FormControl>

                {questionType == QUESTION_TYPE.ONE_CORRECT_ANSWER.BACK_END ? (
                  <OneCorrectAnswer
                    modalType={modalType}
                    curQuestion={curQuestion}
                    setCurQuestion={setCurQuestion}
                  />
                ) : (
                  ""
                )}

                <Box
                  display='flex'
                  justifyContent='right'
                  sx={{ marginTop: 2 }}
                >
                  <MKButton
                    variant='gradient'
                    color='dark'
                    onClick={() => setIsOpenSubjectModal(false)}
                    sx={{ marginRight: 2 }}
                  >
                    Đóng
                  </MKButton>
                  <MKButton
                    type='submit'
                    color='info'
                    form='form-create-question'
                  >
                    Lưu
                  </MKButton>
                </Box>
              </form>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default QuestionModal;
