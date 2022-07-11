import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { Typography } from "antd";
import authAPI from "api/authAPI";
// Images
import bgImage from "assets/images/backgroundSignIn.jpeg";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import TPNotification from "components/TPNotification";
import { NOTIFICATION } from "constants/notification";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import checkLogin from "utils/checkLogin";
import * as yup from "yup";

// const yupSchema = yup.object().shape({
//   username: yup.string().required("Trường này bắt buộc!"),
//   password: yup.string().required("Trường này bắt buộc!"),
// });

function SignIn() {
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ resolver: yupResolver(yupSchema) });

  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [openNoti, setOpenNoti] = useState(false);

  useEffect(() => {
    checkLogin() ? navigate("/list-exams") : "";
  }, []);

  const onChangeUsername = (event) => {
    const value = event.target.value;
    setusername(value);
  };

  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const showPass = () => {
    setIsShowPass(!isShowPass);
  };

  const onSubmit = async () => {
    try {
      let payload = new FormData();
      payload.append("username", username);
      payload.append("password", password);
      console.log({ payload });

      await authAPI.login(payload).then((res) => {
        if (res?.status === 200) {
          localStorage.setItem("token", `Bearer ${res?.data.access_token}`);
        } else {
          setNotification({
            message: "Đăng nhập thất bại",
            type: NOTIFICATION.ERROR,
          });
          setOpenNoti(true);
        }
      });
      await authAPI.aboutMe().then((res) => {
        if (res?.status === 200) {
          setOpenNoti(true);
          localStorage.setItem("current_user", JSON.stringify(res?.data));
          if (location.state?.from) {
            navigate(location.state.from);
          } else navigate("/list-exams");
        } else {
          setNotification({
            message: "Đăng nhập thất bại",
            type: NOTIFICATION.ERROR,
          });
          setOpenNoti(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MKBox
        position='absolute'
        top={0}
        left={0}
        zIndex={1}
        width='100%'
        minHeight='100vh'
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox
        px={1}
        width='100%'
        height='100vh'
        mx='auto'
        position='relative'
        zIndex={2}
      >
        <Grid
          container
          spacing={1}
          justifyContent='center'
          alignItems='center'
          height='100%'
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant='gradient'
                bgColor='info'
                borderRadius='lg'
                coloredShadow='info'
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign='center'
              >
                <MKTypography
                  variant='h4'
                  fontWeight='medium'
                  color='white'
                  mt={1}
                >
                  Đăng nhập
                </MKTypography>
              </MKBox>
              <Box pt={4} pb={3} px={3}>
                <Box component='form' role='form'>
                  <Box mb={2}>
                    <TextField
                      sx={{
                        width: "100%",
                      }}
                      size='normal'
                      variant='outlined'
                      label='Tên tài khoản'
                      onChange={onChangeUsername}
                    />
                  </Box>
                  <MKBox
                    display='flex'
                    alignItems='center'
                    sx={{ position: "relative" }}
                    mb={2}
                  >
                    <TextField
                      sx={{
                        width: "100%",
                      }}
                      type={isShowPass ? "text" : "password"}
                      size='normal'
                      variant='outlined'
                      label='Mật khẩu'
                      onChange={onChangePassword}
                    />
                    {isShowPass ? (
                      <VisibilityOffIcon
                        sx={{ position: "absolute", right: 8 }}
                        onClick={showPass}
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{ position: "absolute", right: 8 }}
                        onClick={showPass}
                      />
                    )}
                  </MKBox>
                </Box>
              </Box>
              <MKBox mt={4} mb={1} sx={{ margin: 2, marginBottom: 2 }}>
                <MKButton
                  variant='gradient'
                  color='info'
                  fullWidth
                  onClick={onSubmit}
                >
                  Đăng nhập
                </MKButton>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <TPNotification
        type={notification.type}
        message={notification.message}
        open={openNoti}
        setOpen={setOpenNoti}
      />
    </>
  );
}

export default SignIn;
