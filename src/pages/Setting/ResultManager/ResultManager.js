import { Box, Typography } from "@mui/material";
import resultAPI from "api/resultAPI";
import subjectAPI from "api/subjectAPI";
import userAPI from "api/userApi";
import { useEffect, useState } from "react";
import MKBox from "../../../components/MKBox";
import ResultTable from "./ResultTable";

const ResultManager = () => {
  const [listResults, setListResults] = useState();
  const [listSubjects, setListSubjects] = useState();
  const [listUsers, setListUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [isLoadSubjectAgain, setIsLoadSubjectAgain] = useState(true);

  const convertResults = () => {
    const listResultConverted = listResults?.map((item) => ({
      ...item,
      subject: findSubjectById(item.subject_id),
      user: findUserById(item?.user_id),
    }));
    setListResults(listResultConverted);
  };

  const findSubjectById = (subjectId) => {
    return listSubjects?.find((item) => item.id == subjectId);
  };

  const findUserById = (userId) => {
    return listUsers?.find((item) => item.id == userId);
  };

  const getAllSubject = async () => {
    await subjectAPI.getAll().then((res) => {
      if (res?.status == 200) {
        setListSubjects(res?.data);
        setLoading(false);
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
    convertResults();
  }, [listSubjects, listUsers]);

  const getResultForUser = async () => {
    await resultAPI.getResultForUser().then((res) => {
      if (res.status == 200) {
        setListResults(res?.data);
        getAllSubject();
        getAllUser();
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (isLoadSubjectAgain) {
      getResultForUser();
      setIsLoadSubjectAgain(false);
    }
  }, [isLoadSubjectAgain]);

  return (
    <MKBox>
      <Box
        className='title__box'
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant='h5' component={"div"}>
          Quản lý bài thi
        </Typography>
      </Box>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        {loading ? null : (
          <ResultTable
            listResults={listResults}
            setIsLoadSubjectAgain={setIsLoadSubjectAgain}
          />
        )}
      </Box>
    </MKBox>
  );
};

export default ResultManager;
