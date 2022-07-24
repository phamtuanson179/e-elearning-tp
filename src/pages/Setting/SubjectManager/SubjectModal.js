import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, Modal, TextField, Typography } from "@mui/material";
import MKButton from "components/MKButton";
import TPNotification from "components/TPNotification";
import "./SubjectModal.js";
import React, { useState, useEffect } from "react";
import subjectAPI from "../../../api/subjectAPI";
import { Controller, useForm } from "react-hook-form";
import { MODAL_TYPE } from "constants/type.js";
import EditIcon from "@mui/icons-material/Edit";

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

const SubjectModal = ({ modalType, subject, setIsLoadSubjectAgain }) => {
  const [isOpenSubjectModal, setIsOpenSubjectModal] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const { control, handleSubmit, reset, getValues, setValue } = useForm();

  useEffect(() => {
    if (modalType == MODAL_TYPE.UPDATE) {
      setValue("name", subject.name);
      setValue("type", subject.type);
      setValue("time", subject.time);
      setValue("amount_question", subject.amount_question);
      setValue(
        "min_correct_question_to_pass",
        subject.min_correct_question_to_pass
      );
      setValue("alias", subject.alias);
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
        id: subject?.id,
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
            Thêm bài thi
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
              <form onSubmit={handleSubmit(onSubmit)} id='form-add-subject'>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='outlined'
                        label='Tên môn học'
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name='alias'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='outlined'
                        label='Mã môn học'
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name='time'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='outlined'
                        label='Thời gian thi'
                        type='number'
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name='amount_question'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='outlined'
                        label='Số câu hỏi'
                        type='number'
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name='min_correct_question_to_pass'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='outlined'
                        label='Số câu trả lời đúng tối thiểu'
                        type='number'
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='outlined'
                        label='Mô tả'
                        {...field}
                      />
                    );
                  }}
                />
                <Box display='flex' justifyContent='right'>
                  <MKButton
                    variant='gradient'
                    color='dark'
                    onClick={() => setIsOpenSubjectModal(false)}
                    sx={{ marginRight: 2 }}
                  >
                    Đóng
                  </MKButton>
                  <MKButton type='submit' color='info' form='form-add-subject'>
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

export default SubjectModal;
