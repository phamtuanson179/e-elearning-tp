import { Box, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import examAPI from "api/examAPI";
import { useState } from "react";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const TableHistoryExam = ({ id }) => {

    const [historyExamList, setHistoryExamList] = useState();
    const getHistoryExamList = async () => {
        await examAPI.getExamHistory().then((res) => {

        })
    }

    return (
        <>
            < TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead sx={{ display: 'table-header-group' }}>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Kết quả</TableCell>
                            <TableCell align="right">Thời gian</TableCell>
                            <TableCell align="right">Đánh giá</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ TableContainer >
        </>)

}

export default TableHistoryExam