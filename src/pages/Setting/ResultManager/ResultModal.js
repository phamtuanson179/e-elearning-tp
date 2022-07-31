import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
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
import "./ResultModal.js";
import OneCorrectAnswer from "./QuestionType/OneCorrectAnswer.js";
import { InfoOutlined } from "@mui/icons-material";
import {
  convertTimestampToDateString,
  convertTimestampToFullDate,
} from "utils/time";
import { ROLE } from "constants/role";

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
  maxWidth: "95vw",
  minWidth: "75vw",
  flexDirection: "column",
  borderRadius: "12px",
  bgColor: "white",
  border: "1px solid #0000003d",
};

const ResultModal = ({
  modalType,
  result,
  listSubjects,
  setIsLoadSubjectAgain,
}) => {
  const { Option } = Select;
  const [isOpenSubjectModal, setIsOpenSubjectModal] = useState(false);
  const [questionType, setQuestionType] = useState(
    QUESTION_TYPE.ONE_CORRECT_ANSWER.BACK_END
  );

  const [curQuestion, setCurQuestion] = useState({});

  const [subjectIdOfQuestion, setSubjectIdOfQuestion] = useState("");

  return (
    <Box>
      <Box textAlign={"right"}>
        <button
          className='btn text-info'
          onClick={() => {
            setIsOpenSubjectModal(true);
          }}
        >
          <InfoOutlined />
        </button>
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
                Chi tiết bài thi
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
            <Box sx={{ padding: 2 }}>
              <Box className='d-flex justify-content-between'>
                <Box className='left__section' style={{ flex: 1 }}>
                  <Box
                    className=' border border-dark row'
                    sx={{
                      margin: "0.5rem",
                      padding: "0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    <Typography className='col-4' variant='body1'>
                      Họ tên
                    </Typography>
                    <Typography className='col-8' variant='h5'>
                      {result?.user?.fullname}
                    </Typography>
                    <Typography className='col-4' variant='body1'>
                      Email
                    </Typography>
                    <Typography className='col-8' variant='h5'>
                      {result?.user?.email}
                    </Typography>

                    <Typography className='col-4' variant='body1'>
                      Ngày sinh
                    </Typography>
                    <Typography className='col-8' variant='h5'>
                      {convertTimestampToDateString(result?.user?.dob)}
                    </Typography>
                    <Typography className='col-4' variant='body1'>
                      Quyền
                    </Typography>
                    <Typography className='col-8' variant='h5'>
                      {result?.user?.role == ROLE.ADMIN
                        ? "Quản trị viên"
                        : result?.user?.role == ROLE.TEACHER
                        ? "Giáo viên"
                        : "Học sinh"}
                    </Typography>
                  </Box>
                  <Box
                    className=' border border-dark row'
                    sx={{
                      margin: "0.5rem",
                      padding: "0.5rem",

                      borderRadius: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    <Typography className='col-4' variant='body1'>
                      Môn thi
                    </Typography>
                    <Typography className='col-8' variant='h5'>
                      {result?.subject?.name}
                    </Typography>
                    <Typography className='col-4' variant='body1'>
                      Thời gian thi
                    </Typography>
                    <Typography className='col-8' variant='h5'>
                      {result?.time}
                    </Typography>
                    <Typography className='col-4' variant='body1'>
                      Điểm thi
                    </Typography>
                    <Typography className='col-8' variant='h5'>
                      {result?.point}
                    </Typography>
                    <Typography className='col-4' variant='body1'>
                      Trạng thái thi
                    </Typography>
                    <Typography className='col-8' variant='h5'>
                      {result?.is_pass ? "Hoàn thành" : "Thất bại"}
                    </Typography>
                    <Typography className='col-4' variant='body1'>
                      Thời điểm thi
                    </Typography>
                    <Typography className='col-8' variant='h5'>
                      {convertTimestampToFullDate(result?.created_at)}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className='right__section'
                  style={{ flex: 1, maxHeight: "80vh", overflowY: "auto" }}
                >
                  {result.questions.map((question) =>
                    question.type ==
                    QUESTION_TYPE.ONE_CORRECT_ANSWER.BACK_END ? (
                      <OneCorrectAnswer question={question} />
                    ) : (
                      ""
                    )
                  )}
                </Box>
              </Box>

              <Box display='flex' justifyContent='right' sx={{ marginTop: 2 }}>
                <MKButton
                  variant='gradient'
                  color='dark'
                  onClick={() => setIsOpenSubjectModal(false)}
                >
                  Đóng
                </MKButton>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default ResultModal;
