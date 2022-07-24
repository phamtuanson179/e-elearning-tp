import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { MODAL_TYPE } from "constants/type";
import DeleteSubjectPopover from "./DeleteSubjectPopover";
import SubjectModal from "./SubjectModal";

const SubjectTable = ({ listSubjects, setIsLoadSubjectAgain }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        {/* <TableHead> */}
        <TableRow sx={{ fontWeight: "bold" }}>
          <TableCell sx={{ fontWeight: "bold" }}>Tên môn học</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Mã môn học</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Thời gian thi</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Số câu hỏi</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>
            Số câu trả lời đúng tối thiểu
          </TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Mô tả</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}></TableCell>
        </TableRow>
        {/* </TableHead> */}
        <TableBody>
          {listSubjects.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row?.name}
              </TableCell>
              <TableCell>{row?.alias}</TableCell>
              <TableCell>{row?.time}</TableCell>
              <TableCell>{row?.amount_question}</TableCell>
              <TableCell>{row?.min_correct_question_to_pass}</TableCell>
              <TableCell>{row?.description}</TableCell>
              <TableCell sx={{ display: "flex", alignItems: "center" }}>
                <SubjectModal
                  modalType={MODAL_TYPE.UPDATE}
                  subject={row}
                  setIsLoadSubjectAgain={setIsLoadSubjectAgain}
                ></SubjectModal>
                <DeleteSubjectPopover
                  setIsLoadSubjectAgain={setIsLoadSubjectAgain}
                  subject_id={row?.id}
                ></DeleteSubjectPopover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubjectTable;
