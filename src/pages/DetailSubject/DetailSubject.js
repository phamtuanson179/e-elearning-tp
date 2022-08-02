import { Box, Button, Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import resultAPI from "api/resultAPI";
import subjectAPI from "api/subjectAPI";
import userAPI from "api/userApi";
import LastestResult from "containers/LastestResult";
import Ranking from "containers/Ranking";
import { param } from "express-validator";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { convertSecondToTime } from "utils/time";
import "./DetailSubject.scss";
const DetailSubject = () => {
  const [subject, setSubject] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [lastestResultExam, setLastestResultExam] = useState();
  const [historyExam, setHistoryExam] = useState();
  const [rankingExam, setRankingExam] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [listUsers, setListUsers] = useState();

  // const getFullRanking = async (params) => {
  //   await subjectAPI.getFullExamRanking(params).then((res) => {
  //     if (res.status === 200) {
  //       const data = res?.data;
  //       if (data) {
  //         setRankingExam(data);
  //       }
  //     }
  //   });
  // };

  useEffect(() => {
    setSubject(location.state?.subject);
  }, []);

  useEffect(() => {
    convertRankingData();
  }, [listUsers]);

  const convertRankingData = () => {
    const convertedRankingExam = rankingExam?.map((item) => ({
      ...item,
      user: findUserById(item?.user_id),
    }));
    setRankingExam(convertedRankingExam);
  };

  const findUserById = (userId) => {
    return listUsers?.find((item) => item.id == userId);
  };

  const getExamHistory = async (params) => {
    await resultAPI.getExamHistory(params).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        if (data) {
          setHistoryExam(data);
          setLastestResultExam(data[data.length - 1]);
          setIsLoading(false);
        }
      }
    });
  };

  const getFullResultRanking = async (params) => {
    await resultAPI.getFullResultRanking(params).then((res) => {
      if (res.status == 200) {
        setRankingExam(res?.data);
        getAllUser();
      }
    });
  };

  const getAllUser = async () => {
    await userAPI.getAll().then((res) => {
      if (res.status == 200) {
        setListUsers(res?.data);
      }
    });
  };

  useEffect(() => {
    const paramsHistory = {
      user_id: JSON.parse(localStorage.getItem("current_user")).id,
      subject_id: location.state?.subject?.id,
    };

    const paramsRanking = {
      subject_id: location.state?.subject?.id,
    };
    getExamHistory(paramsHistory);
    getFullResultRanking(paramsRanking);
  }, []);

  return (
    <Card
      sx={{
        p: 1,
        mx: { xs: 2, lg: 3 },
        // mt: 8,
        mb: 4,
        backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
          rgba(white.main, 0.8),
        backdropFilter: "saturate(200%) blur(30px)",
        boxShadow: ({ boxShadows: { xxl } }) => xxl,
      }}
      className='detail-subject__container'
    >
      <Box component='section' py={8}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: 2,
              marginBottom: 2,
            }}
            className='description__subject'
          >
            <Box
              sx={{
                flex: 1,
                borderRadius: 4,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${subject?.image})`,
                backgroundRepeat: "no-repeat",
                maxWidth: 180,
                height: 180,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
            <Box
              sx={{
                flex: 2,
                marginLeft: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant={"h2"} marginBottom={2}>
                {subject?.name}
              </Typography>
              <Box>
                <Typography variant='subtitle2'>
                  Thời gian:{" "}
                  {`${convertSecondToTime(subject?.time).minutes}:${
                    convertSecondToTime(subject?.time).seconds
                  }`}
                </Typography>
                <Typography variant='subtitle2'>
                  Số câu hỏi: {subject?.amount_question}
                </Typography>
                <Typography variant='subtitle2'>
                  Số câu đúng tối thiểu: {subject?.min_correct_question_to_pass}
                </Typography>
              </Box>
            </Box>
            <Button
              className='start__button'
              sx={{ height: 40, alignSelf: "center", marginLeft: 2 }}
              onClick={() => {
                navigate("/exam", { state: { subject: subject } });
              }}
            >
              Bắt đầu
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ flex: 1, height: "initial" }}>
              <LastestResult
                lastestResultExam={lastestResultExam}
                historyExam={historyExam}
                subject={subject}
                isLoading={isLoading}
              />
            </Box>

            <Box sx={{ flex: 1, height: "initial" }}>
              <Ranking rankingExam={rankingExam} isLoading={isLoading} />
            </Box>
          </Box>
        </Container>
      </Box>
    </Card>
  );
};

export default DetailSubject;
