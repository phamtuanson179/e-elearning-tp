import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MKButton from "components/MKButton";
import TPNotification from "components/TPNotification";
import "./UserModal.js";
import React, { useState, useEffect } from "react";
import subjectAPI from "../../../api/subjectAPI";
import { Controller, useForm } from "react-hook-form";
import { MODAL_TYPE } from "constants/type.js";
import EditIcon from "@mui/icons-material/Edit";
import { ROLE } from "constants/role.js";
import userAPI from "api/userApi.js";

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
const style = {
  bgcolor: "background.paper",
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  maxWidth: "700px",
  minWidth: "600px",
  flexDirection: "column",
  borderRadius: "12px",
  bgColor: "white",
  border: "1px solid #0000003d",
};

const UserModal = ({
  modalType,
  listSubjects,
  user,
  setIsLoadSubjectAgain,
}) => {
  const [isOpenSubjectModal, setIsOpenSubjectModal] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const { control, handleSubmit, reset, getValues, setValue } = useForm();

  const [listSubjectsId, setListSubjectsId] = useState([]);

  useEffect(() => {
    reset();
    setListSubjectsId([]);
    if (modalType == MODAL_TYPE.UPDATE) {
      setValue("fullname", user?.fullname);
      setValue("username", user?.username);
      setValue("email", user?.email);
      setValue("dob", new Date(user?.dob).toISOString().split("T")[0]);
      setValue("role", user?.role);
      setListSubjectsId(user?.list_subjects_id);
    }
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      fullname: data?.fullname,
      username: data?.username,
      list_subjects_id: listSubjectsId,
      email: data?.email,
      dob: new Date(data?.dob).getTime(),
      role: data?.role,
    };

    if (modalType == MODAL_TYPE.UPDATE) {
      const params = {
        id: user?.id,
      };
      updateUser(params, payload);
    } else createUser(payload);
  };

  const createUser = async (payload) => {
    await userAPI.create(payload).then((res) => {
      if (res.status == 200) {
        setIsOpenSubjectModal(false);
        setIsLoadSubjectAgain(true);
      }
    });
  };

  const updateUser = async (params, payload) => {
    await userAPI.update(params, payload).then((res) => {
      if (res.status == 200) {
        setIsOpenSubjectModal(false);
        setIsLoadSubjectAgain(true);
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
  return (
    <Box>
      <Box textAlign={"right"}>
        {modalType == MODAL_TYPE.ADD ? (
          <MKButton
            variant='gradient'
            color='info'
            onClick={() => {
              setIsOpenSubjectModal(true);
            }}
          >
            Thêm người dùng
          </MKButton>
        ) : (
          <button
            className='btn text-success'
            onClick={() => {
              setIsOpenSubjectModal(true);
            }}
          >
            <EditIcon />
          </button>
        )}
      </Box>
      <Box>
        <Modal
          sx={{
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={isOpenSubjectModal}
          onClose={() => {
            setIsOpenSubjectModal(false);
          }}
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
                {modalType == MODAL_TYPE.ADD
                  ? "Thêm người dùng"
                  : "Cập nhật người dùng"}
              </Typography>
              <CloseIcon
                fontSize='medium'
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setIsOpenSubjectModal(false);
                }}
              />
            </Box>
            <Divider sx={{ marginBottom: 0 }} />
            <Box sx={{ padding: 2, maxHeight: "80vh", overflowY: "auto" }}>
              <form onSubmit={handleSubmit(onSubmit)} id='form-add-subject'>
                <Controller
                  name='fullname'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='outlined'
                        label='Họ tên'
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='outlined'
                        label='Email'
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name='dob'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        id='date'
                        label='Ngày sinh'
                        type='date'
                        sx={{
                          width: "100%",
                          marginBottom: "1rem",
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        {...field}
                      />
                    );
                  }}
                />

                <Controller
                  name='role'
                  control={control}
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
                          sx={{ height: 44, marginBottom: "1rem" }}
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
                <Controller
                  name='list_subjects_id'
                  control={control}
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
                          {listSubjects &&
                            listSubjects.map((subject) => (
                              <MenuItem value={subject?.id}>
                                {subject?.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    );
                  }}
                />

                <Controller
                  name='username'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginTop: "1rem" }}
                        variant='outlined'
                        label='Tên đăng nhập'
                        {...field}
                      />
                    );
                  }}
                />

                <Box
                  display='flex'
                  justifyContent='right'
                  sx={{ marginTop: "1rem" }}
                >
                  <MKButton
                    variant='gradient'
                    color='dark'
                    onClick={() => setIsOpenSubjectModal(false)}
                    sx={{ marginRight: 2 }}
                  >
                    Đóng
                  </MKButton>
                  <MKButton type='submit' color='info' form='form-add-subject'>
                    Lưu
                  </MKButton>
                </Box>
              </form>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default UserModal;
