import {
  Check,
  Close,
  CloseFullscreenOutlined,
  CloseRounded,
} from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { convertTimestampToFullDate } from "utils/time";
import ResultModal from "./ResultModal";

const ResultTable = ({ listResults, setIsLoadSubjectAgain }) => {
  console.log({ listResults });
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        {/* <TableHead> */}
        <TableRow sx={{ fontWeight: "bold" }}>
          <TableCell sx={{ fontWeight: "bold" }}>Người thi</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Môn thi</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Thời gian thi</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Điểm thi</TableCell>
          <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
            Trạng thái
          </TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Thời điểm thi</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}></TableCell>
        </TableRow>
        {/* </TableHead> */}
        <TableBody>
          {listResults.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row?.user?.fullname}
              </TableCell>
              <TableCell>{row?.subject?.name}</TableCell>
              <TableCell>{row?.time}</TableCell>
              <TableCell>{row?.point}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {row?.is_pass ? (
                  <Check className='text-success' />
                ) : (
                  <Close className='text-danger' />
                )}
              </TableCell>
              <TableCell>
                {convertTimestampToFullDate(row?.created_at)}
              </TableCell>
              <TableCell sx={{ display: "flex", alignItems: "center" }}>
                <ResultModal
                  result={row}
                  setIsLoadSubjectAgain={setIsLoadSubjectAgain}
                ></ResultModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
