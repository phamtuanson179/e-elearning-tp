import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { ROLE } from "constants/role";

import { MODAL_TYPE } from "constants/type";
import { convertTimestampToDateString } from "utils/time";
import DeleteSubjectPopover from "./DeleteUserPopover";
import SubjectModal from "./UserModal";

const UserTable = ({ listUsers, setIsLoadSubjectAgain, listSubjects }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        {/* <TableHead> */}
        <TableRow sx={{ fontWeight: "bold" }}>
          <TableCell sx={{ fontWeight: "bold" }}>Họ tên</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Tên đăng nhập</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Ngày sinh</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Quyền</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Môn học</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}></TableCell>
        </TableRow>
        {/* </TableHead> */}
        <TableBody>
          {listUsers.map((row) => (
            <TableRow
              key={row?.username}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row?.fullname}
              </TableCell>
              <TableCell>{row?.username}</TableCell>
              <TableCell>{row?.email}</TableCell>
              <TableCell>{convertTimestampToDateString(row?.dob)}</TableCell>
              <TableCell>
                {row?.role == ROLE.ADMIN
                  ? "Quản trị viên"
                  : row?.role == ROLE.TEACHER
                  ? "Giáo viên"
                  : "Học sinh"}
              </TableCell>
              <TableCell>
                {row?.list_subjects?.map((item) => item?.name).join(", ")}
              </TableCell>
              <TableCell sx={{ display: "flex", alignItems: "center" }}>
                <SubjectModal
                  listSubjects={listSubjects}
                  modalType={MODAL_TYPE.UPDATE}
                  user={row}
                  setIsLoadSubjectAgain={setIsLoadSubjectAgain}
                ></SubjectModal>
                <DeleteSubjectPopover
                  setIsLoadSubjectAgain={setIsLoadSubjectAgain}
                  user_id={row?.id}
                ></DeleteSubjectPopover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
