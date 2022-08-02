import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import { MODAL_TYPE, QUESTION_TYPE } from "constants/type";
import DeleteQuestionPopover from "./DeleteQuestionPopover";
import QuestionModal from "./QuestionModal";

function Row({ row, listQuestions, listSubjects, setIsLoadSubjectAgain }) {
  const [open, setOpen] = React.useState(false);

  const renderCorrectAnswer = (listAnswers) => {
    let result = [];
    if (listAnswers) {
      listAnswers.forEach((item, idx) => {
        if (item.is_correct == true) {
          result.push(item.content);
        }
      });
    }
    return result.join(", ");
  };

  const renderQuestionType = (questionType) => {
    if (questionType) {
      switch (questionType) {
        case QUESTION_TYPE.ONE_CORRECT_ANSWER.BACK_END:
          return QUESTION_TYPE.ONE_CORRECT_ANSWER.VIEW;
        case QUESTION_TYPE.MANY_CORRECT_ANSWER.BACK_END:
          return QUESTION_TYPE.MANY_CORRECT_ANSWER.VIEW;
        case QUESTION_TYPE.TRUE_FALSE_ANSWER.BACK_END:
          return QUESTION_TYPE.TRUE_FALSE_ANSWER.VIEW;
        default:
          return "";
      }
    }
    return "";
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row?.title}
        </TableCell>
        <TableCell>{renderQuestionType(row?.type)}</TableCell>
        <TableCell>{row?.subject?.name}</TableCell>
        <TableCell>{renderCorrectAnswer(row?.answers)}</TableCell>
        <TableCell>{row?.min_correct_question_to_pass}</TableCell>
        <TableCell sx={{ display: "flex", alignItems: "center" }}>
          {listSubjects ? (
            <QuestionModal
              modalType={MODAL_TYPE.UPDATE}
              question={row}
              listSubjects={listSubjects}
              setIsLoadSubjectAgain={setIsLoadSubjectAgain}
            ></QuestionModal>
          ) : null}

          <DeleteQuestionPopover
            setIsLoadSubjectAgain={setIsLoadSubjectAgain}
            question_id={row?.id}
          ></DeleteQuestionPopover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Chi tiết câu trả lời
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableRow>
                  <TableCell>Số thứ tự</TableCell>
                  <TableCell>Nội dung</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
                <TableBody>
                  {row.answers.map((answer, idx) => (
                    <TableRow key={idx}>
                      <TableCell component='th' scope='row'>
                        {idx + 1}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {answer.content}
                      </TableCell>
                      <TableCell>
                        {answer.is_correct ? "Đúng" : "Sai"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const QuestionTable = ({
  listSubjects,
  setIsLoadSubjectAgain,
  listQuestions,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        {/* <TableHead> */}
        <TableRow sx={{ fontWeight: "bold" }}>
          <TableCell />
          <TableCell sx={{ fontWeight: "bold" }}>Tiêu đề</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Loại câu hỏi</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Môn học</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Câu trả lời đúng</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}></TableCell>
        </TableRow>
        {/* </TableHead> */}
        <TableBody>
          {listQuestions?.map((row, idx) => (
            <Row
              key={idx}
              listSubjects={listSubjects}
              listQuestions={listQuestions}
              row={row}
              setIsLoadSubjectAgain={setIsLoadSubjectAgain}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuestionTable;
