import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Progress } from "antd";
import examAPI from "api/questionAPI";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { convertSecondToTime, convertTimestampToFullDate } from "utils/time";

const RankingTable = ({ rankingExam }) => {
  const [rows, setRows] = useState();

  useEffect(() => {
    if (rankingExam) setRows(rankingExam);
  }, []);

  const showTime = (duration) => {
    const time = convertSecondToTime(duration);
    return `${time.minutes}:${time.seconds}`;
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "50vh" }}>
      <Table
        stickyHeader
        sx={{ minWidth: 650 }}
        size='small'
        aria-label='a dense table'
      >
        <TableHead sx={{ display: "table-header-group" }}>
          <TableRow>
            <TableCell align='center'>Stt</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell align='right'>Điểm</TableCell>
            <TableCell align='right'>Thời gian thi</TableCell>
            <TableCell align='right'>Thời điểm thi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align='center'>{idx + 1}</TableCell>
                <TableCell component='th' scope='row'>
                  {row?.user?.fullname}
                </TableCell>
                <TableCell align='right'>{row?.point}</TableCell>
                <TableCell align='right'>{showTime(row?.time)}</TableCell>
                <TableCell align='right'>
                  {convertTimestampToFullDate(row?.created_at)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankingTable;
