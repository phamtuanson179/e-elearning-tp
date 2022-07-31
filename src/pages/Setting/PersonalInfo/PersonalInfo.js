import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TPNotification from "components/TPNotification";
import { NOTIFICATION } from "constants/notification";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import otherAPI from "api/otherAPI";
import * as yup from "yup";
import "./PersonalInfo.scss";

import TPUploadImage from "components/TPUploadImage";
import MKBox from "components/MKBox";
import subject from "pages/Exam/Exam";
import subjectAPI from "api/subjectAPI";
import authAPI from "api/authAPI";
import { ROLE } from "constants/role";
import ListSubjects from "pages/ListSubjects";
import userAPI from "api/userApi";
import { ResetTvSharp } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const PersonalInfo = () => {
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [openNoti, setOpenNoti] = useState(false);
  const [avatar, setAvatar] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [allSubject, setAllSubject] = useState();
  const [listSubjectsId, setListSubjectsId] = useState([]);
  const [me, setMe] = useState();

  const { control, handleSubmit } = useForm();

  const getAllSubject = async () => {
    await subjectAPI.getAll().then((res) => {
      if (res?.status == 200) {
        setAllSubject(res?.data);
      }
    });
  };

  const updateMe = async (data) => {
    await userAPI.updateMe(data).then((res) => {
      if (res.status == 200) {
        authAPI.aboutMe().then((res) => {
          if (res.status == 200) {
            localStorage.setItem("current_user", JSON.stringify(res?.data));
          }
        });
      }
    });
  };

  const aboutMe = async (data) => {
    await authAPI.aboutMe().then((res) => {
      if (res.status == 200) {
        res.data.dob = new Date(res.data?.dob).toISOString().split("T")[0];
        console.log(res.data);
        setMe(res.data);
        setAvatar(res.data?.avatar);
        setListSubjectsId(res?.data?.list_subjects_id);
        setIsLoading(false);
      }
    });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setListSubjectsId(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    getAllSubject();
    aboutMe();
  }, []);

  const onSubmit = async (data) => {
    const paylaod = {
      fullname: data?.fullname,
      dob: new Date(data?.dob).getTime(),
      list_subjects_id: listSubjectsId,
      email: data?.email,
      avatar: avatar,
    };
    updateMe(paylaod);
  };

  return (
    <Box className='personal-info__container'>
      <Box
        className='title__box'
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant='h5' component={"div"}>
          Thông tin cá nhân
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} id='update-me-form'>
        <Box sx={{ display: "flex", justifyContent: "center", margin: 1.5 }}>
          <Grid
            className='detail-personal-info__box'
            container
            sx={{
              marginTop: 2,
              marginBottom: 2,
              marginLeft: -2,
              width: "100%",
            }}
            spacing={2}
            rowSpacing={3}
          >
            <Box
              width={"100%"}
              sx={{ display: "flex", justifyContent: "center" }}
              marginBottom={2}
            >
              {isLoading ? (
                <Skeleton variant='circular' width={180} height={180} />
              ) : (
                <TPUploadImage
                  img={avatar}
                  setImg={setAvatar}
                  type={"avatar"}
                />
              )}
            </Box>
            <Grid item xs={6} className='name'>
              {isLoading ? (
                <Skeleton fullwidth height={44} variant='rectangular' />
              ) : (
                <Controller
                  name='fullname'
                  control={control}
                  defaultValue={me?.fullname}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{
                          width: "100%",
                        }}
                        {...field}
                        label='Họ và tên'
                        variant='outlined'
                      />
                    );
                  }}
                />
              )}
            </Grid>

            <Grid item xs={6} className='dob'>
              {isLoading ? (
                <Skeleton fullwidth height={44} variant='rectangular' />
              ) : (
                <Controller
                  name='dob'
                  control={control}
                  defaultValue={me?.dob}
                  render={({ field }) => {
                    return (
                      <TextField
                        id='date'
                        label='Birthday'
                        type='date'
                        sx={{
                          width: "100%",
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...field}
                      />
                    );
                  }}
                />
              )}
            </Grid>
            <Grid item xs={6} className='username'>
              {isLoading ? (
                <Skeleton fullwidth height={44} variant='rectangular' />
              ) : (
                <Controller
                  name='username'
                  control={control}
                  defaultValue={me?.username}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{
                          width: "100%",
                        }}
                        {...field}
                        label='Tên đăng nhập'
                        variant='outlined'
                        disabled
                      />
                    );
                  }}
                />
              )}
            </Grid>
            <Grid item xs={6} className='email'>
              {isLoading ? (
                <Skeleton fullwidth height={44} variant='rectangular' />
              ) : (
                <Controller
                  name='email'
                  control={control}
                  defaultValue={me?.email}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{
                          width: "100%",
                        }}
                        {...field}
                        label='Email'
                        variant='outlined'
                      />
                    );
                  }}
                />
              )}
            </Grid>

            <Grid item xs={6} className='role'>
              {isLoading ? (
                <Skeleton fullwidth height={44} variant='rectangular' />
              ) : (
                <Controller
                  name='role'
                  control={control}
                  defaultValue={me?.role}
                  render={({ field }) => {
                    return (
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                          Quyền
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label='Quyền'
                          sx={{ height: 44 }}
                          disabled
                          {...field}
                        >
                          <MenuItem value={ROLE.ADMIN}>Quản trị viên</MenuItem>
                          <MenuItem value={ROLE.STUDENT}>Học sinh</MenuItem>
                          <MenuItem value={ROLE.TEACHER}>Giáo viên</MenuItem>
                        </Select>
                      </FormControl>
                    );
                  }}
                />
              )}
            </Grid>
            <Grid item xs={6} className='room'>
              {isLoading ? (
                <Skeleton fullwidth height={44} variant='rectangular' />
              ) : (
                <Controller
                  name='subject_id'
                  control={control}
                  defaultValue={me?.list_subjects_id}
                  render={({ field }) => {
                    return (
                      <FormControl fullWidth>
                        <InputLabel id='demo-multiple-name-label'>
                          Môn học
                        </InputLabel>
                        <Select
                          sx={{ height: 44 }}
                          labelId='demo-multiple-name-label'
                          id='demo-multiple-name'
                          value={listSubjectsId}
                          onChange={handleChange}
                          multiple
                          MenuProps={MenuProps}
                          input={<OutlinedInput label='Môn học' />}
                        >
                          {allSubject &&
                            allSubject.map((subject) => (
                              <MenuItem value={subject?.id}>
                                {subject?.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    );
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Box>
        <Button
          className='confirm__button'
          sx={{
            marginLeft: "auto",
            display: "flex",
            marginRight: 2,
            marginBottom: 4,
          }}
          type='submit'
          form='update-me-form'
        >
          Lưu thay đổi
        </Button>
      </form>
      <TPNotification
        type={notification.type}
        message={notification.message}
        open={openNoti}
        setOpen={setOpenNoti}
      />
    </Box>
  );
};

export default PersonalInfo;
