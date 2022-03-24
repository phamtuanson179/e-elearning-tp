import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Button, Typography, Modal, Divider } from "@mui/material";
import { Progress } from "antd";
import examAPI from "api/examAPI";
import { useState } from "react";
import { convertSecondToTime } from "utils/convert";
import CloseIcon from "@mui/icons-material/Close";
import "./LastestResult.scss";
import HistoryExamTable from "containers/HistoryExamTable";

const style = {
  bgcolor: "background.paper",
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  // maxWidth: "500px",
  flexDirection: "column",
  borderRadius: "12px",
  bgColor: "white",
  border: "1px solid #0000003d",
};

const LastestResult = ({ lastestResultExam, historyExam }) => {
  console.log({ lastestResultExam })
  const [openModal, setOpenModal] = useState()

  const caculatePercentResult = (point, maxPoint) => {
    return (point / maxPoint) * 100;
  };

  const showTime = (duration) => {
    const time = convertSecondToTime(duration);
    return `${time.minutes}:${time.seconds}`;
  };

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 4,
          marginRight: 1,
        }}
        className='lastest-result__container'
      >
        <Typography
          variant='h5'
          component={"div"}
          sx={{ marginBottom: 4, textAlign: "center" }}
        >
          Lần thi gần nhất
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Progress
            type='circle'
            percent={caculatePercentResult(
              lastestResultExam?.point,
              lastestResultExam?.max_point
            )}
            style={{ alignSelf: "center" }}
            status={lastestResultExam.is_pass ? "" : "exception"}
          />
          <Box sx={{ marginLeft: 1 }}>
            <Typography variant='h2'>
              {`${lastestResultExam.point}/${lastestResultExam.max_point}`}
            </Typography>

            <Typography
              variant='subtitle2'
              sx={{ display: "flex", alignItems: "center" }}
            >
              <AccessTimeIcon sx={{ marginRight: 1 }} />
              {showTime(lastestResultExam.duration)}
            </Typography>

            <Button sx={{ fontSize: 12, padding: 0 }} onClick={() => setOpenModal(true)}>Xem chi tiết</Button>
            <Modal
              sx={{
                overflowY: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              open={openModal}
              onClose={handleCloseModal}
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
                    Lịch sử thi
                  </Typography>
                  <CloseIcon
                    fontSize='medium'
                    sx={{ cursor: "pointer" }}
                    onClick={handleCloseModal}
                  />
                </Box>
                <Divider />
                <Box >
                  <HistoryExamTable historyExam={historyExam} />
                </Box>

              </Box>

            </Modal>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LastestResult;