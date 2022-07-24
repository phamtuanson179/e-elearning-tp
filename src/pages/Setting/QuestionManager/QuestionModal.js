import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Divider, Modal, TextField, Typography } from "@mui/material";
import { Select } from "antd";
import MKButton from "components/MKButton";
import { MODAL_TYPE, QUESTION_TYPE } from "constants/type.js";
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

  const [subjectIdOfQuestion, setSubjectIdOfQuestion] = useState("");

  const { control, handleSubmit, reset, getValues, setValue } = useForm();

  useEffect(() => {
    console.log({ listSubjects });
    if (modalType == MODAL_TYPE.UPDATE) {
      setValue("title", question.title);
      // setValue("type", question.type);
      // setValue("subject_id", question.subject_id);
    }
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      time: data.time,
      description: data.description,
      amount_question: data.amount_question,
      min_correct_question_to_pass: data.min_correct_question_to_pass,
      alias: data.alias,
    };
    if (modalType == MODAL_TYPE.UPDATE) {
      const params = {
        id: question?.id,
      };
      updateSubject(params, data);
    } else addSubject(data);
  };

  const addSubject = async (payload) => {
    await subjectAPI.create(payload).then((res) => {
      if (res.status == 200) {
        setIsOpenSubjectModal(false);
        setIsLoadSubjectAgain(true);
      }
    });
  };

  const updateSubject = async (params, payload) => {
    await subjectAPI.update(params, payload).then((res) => {
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
              <form onSubmit={handleSubmit(onSubmit)} id='form-add-question'>
                <Controller
                  name='title'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='outlined'
                        label='Tiêu đề'
                        {...field}
                      />
                    );
                  }}
                />
                <Select
                  size='large'
                  value={questionType}
                  onChange={(value) => setQuestionType(value)}
                  style={{ width: "100%" }}
                >
                  <Option value={QUESTION_TYPE.ONE_CORRECT_ANSWER.BACK_END}>
                    {QUESTION_TYPE.ONE_CORRECT_ANSWER.VIEW}
                  </Option>
                  <Option value={QUESTION_TYPE.MANY_CORRECT_ANSWER.BACK_END}>
                    {QUESTION_TYPE.MANY_CORRECT_ANSWER.VIEW}
                  </Option>
                  <Option value={QUESTION_TYPE.TRUE_FALSE_ANSWER.BACK_END}>
                    {QUESTION_TYPE.TRUE_FALSE_ANSWER.VIEW}
                  </Option>
                </Select>

                {/* <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Age</InputLabel>
                  <Select
                    id='demo-simple-select'
                    sx={{ height: 45 }}
                    labelId='demo-simple-select-label'
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
                    </MenuItem>{" "}
                    <MenuItem
                      disabled
                      value={QUESTION_TYPE.MANY_CORRECT_ANSWER.BACK_END}
                    >
                      {QUESTION_TYPE.MANY_CORRECT_ANSWER.VIEW}
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ marginTop: 2 }}>
                  <InputLabel id='demo-simple-select-label'>Môn học</InputLabel>
                  <Select
                    id='demo-simple-select'
                    sx={{ height: 45 }}
                    labelId='demo-simple-select-label'
                    value={subjectIdOfQuestion}
                    onChange={(e) => setSubjectIdOfQuestion(e.target.value)}
                  >
                    {listSubjects &&
                      listSubjects.map((subject) => (
                        <MenuItem value={subject?.id}>{subject?.name}</MenuItem>
                      ))}
                  </Select>
                </FormControl> */}

                {questionType == QUESTION_TYPE.ONE_CORRECT_ANSWER.BACK_END ? (
                  <OneCorrectAnswer />
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
                  <MKButton type='submit' color='info' form='form-add-question'>
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
