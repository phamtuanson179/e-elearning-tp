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
import "./ChangePassword.js";
import React, { useState, useEffect } from "react";
import subjectAPI from "../../../api/subjectAPI";
import { Controller, useForm } from "react-hook-form";
import { MODAL_TYPE } from "constants/type.js";
import EditIcon from "@mui/icons-material/Edit";
import { ROLE } from "constants/role.js";
import userAPI from "api/userApi.js";
import authAPI from "api/authAPI.js";

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

const ChangePassword = () => {
  const [isOpenSubjectModal, setIsOpenSubjectModal] = useState(false);

  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await authAPI.changePassword(data).then((res) => {
      if (res.status == 200) {
        localStorage.setItem("token", `Bearer ${res?.data.access_token}`);
        setIsOpenSubjectModal(false);
      }
    });
  };

  return (
    <Box>
      <Box textAlign={"right"}>
        <MKButton
          variant='gradient'
          color='warning'
          onClick={() => {
            setIsOpenSubjectModal(true);
          }}
        >
          Thay đổi mật khẩu
        </MKButton>
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
                Thay đổi mật khẩu
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
              <form onSubmit={handleSubmit(onSubmit)} id='form-change-password'>
                <Controller
                  name='old_password'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='outlined'
                        label='Mật khẩu cũ'
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name='new_password'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='outlined'
                        label='Mật khẩu mới'
                        {...field}
                      />
                    );
                  }}
                />{" "}
                <Controller
                  name='repeat_new_password'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        sx={{ width: "100%", marginBottom: 2 }}
                        variant='outlined'
                        label='Nhập lại mật khẩu mới'
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
                  <MKButton
                    type='submit'
                    color='info'
                    form='form-change-password'
                  >
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

export default ChangePassword;
