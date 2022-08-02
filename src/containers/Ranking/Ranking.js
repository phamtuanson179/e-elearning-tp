import {
  Box,
  Button,
  Typography,
  Modal,
  Divider,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import examAPI from "api/questionAPI";
import { useEffect, useState } from "react";
import RankingTable from "containers/RankingTable";
import { convertSecondToTime } from "utils/time";
import CloseIcon from "@mui/icons-material/Close";
import "./Ranking.scss";
import { isEmpty } from "lodash";

const style = {
  bgcolor: "background.paper",
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  flexDirection: "column",
  borderRadius: "12px",
  bgColor: "white",
  border: "1px solid #0000003d",
};

const Ranking = ({ rankingExam, isLoading }) => {
  const [openModal, setOpenModal] = useState();
  const [rankingMe, setRankingMe] = useState();
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getRankingForMe = () => {
    const userId = JSON.parse(localStorage.getItem("current_user")).id;
    console.log(rankingExam?.findIndex((item) => item.user_id == userId));
    setRankingMe(
      rankingExam?.findIndex((item) => {
        item.user_id == userId;
      }) + 1
    );
  };

  useEffect(() => {
    getRankingForMe();
  }, [rankingExam]);

  const renderColor = (rank) => {
    if (rank == 1) return "#FEDA16";
    else if (rank == 2) return "#9E9EA7";
    else if (rank == 3) return "#D89143";
    else return "#1a73e8";
  };

  const renderRanking = (datas) => {
    console.log({ datas });
    return (
      <>
        {datas &&
          datas.map((data, idx) => {
            if (idx < 3)
              return (
                <>
                  {isLoading ? (
                    <Skeleton variant='text' width={60} height={40} />
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: renderColor(idx + 1),
                        borderRadius: 3,
                        paddingLeft: 1,
                        paddingRight: 1,
                        marginBottom: 0.5,
                      }}
                    >
                      <Typography variant='h6' color='#fff'>
                        {data?.user?.fullname}
                      </Typography>
                    </Box>
                  )}
                </>
              );
          })}
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: 4,
          marginLeft: 1,
          height: "100%",
          padding: 2,
        }}
        className='ranking__container'
      >
        <Typography
          variant='h5'
          component={"div"}
          sx={{ marginBottom: 4, textAlign: "center" }}
        >
          Xếp hạng
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {isLoading ? (
            <Skeleton variant='circular' width={120} height={120} />
          ) : rankingExam && isEmpty(rankingExam[0]) ? (
            <Typography variant='body1' textAlign={"center"} color='info'>
              Chưa có dữ liệu về bài thi này
            </Typography>
          ) : (
            <Box
              sx={{
                backgroundColor: renderColor(
                  rankingMe <= 0 ? rankingMe + 1 : ""
                ),
                height: 120,
                aspectRatio: "1/1",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  height: "calc(100% - 16px)",
                  aspectRatio: "1/1",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant='h1'
                  color={renderColor(rankingMe <= 0 ? rankingMe + 1 : "")}
                >
                  {rankingMe <= 0 ? rankingMe + 1 : "--"}
                </Typography>
              </Box>
            </Box>
          )}
          {isLoading ? (
            <Box>
              <Skeleton variant='text' width={60} height={40} />
              <Skeleton variant='text' width={60} height={40} />
              <Skeleton variant='text' width={60} height={40} />
            </Box>
          ) : rankingExam && isEmpty(rankingExam[0]) ? null : (
            <Box sx={{ marginLeft: 1 }}>
              {renderRanking(rankingExam)}
              <Button
                sx={{ fontSize: 12, padding: 0 }}
                onClick={() => setOpenModal(true)}
              >
                Xem chi tiết
              </Button>
            </Box>
          )}
        </Box>

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
          {rankingExam ? (
            <Box>
              <Box sx={style}>
                <Box
                  display='flex'
                  alginItems='center'
                  justifyContent='space-between'
                  sx={{ marginTop: 2, marginLeft: 2, marginRight: 2 }}
                >
                  <Typography id='modal-modal-title' variant='h5'>
                    Xếp hạng
                  </Typography>
                  <CloseIcon
                    fontSize='medium'
                    sx={{ cursor: "pointer" }}
                    onClick={handleCloseModal}
                  />
                </Box>
                <Divider />
                <Box>
                  <RankingTable rankingExam={rankingExam} />
                </Box>
              </Box>
            </Box>
          ) : (
            <CircularProgress />
          )}
        </Modal>
      </Box>
    </>
  );
};

export default Ranking;
