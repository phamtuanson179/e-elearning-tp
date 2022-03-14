import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import breakpoints from "assets/theme/base/breakpoints";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import checkLogin from "utils/checkLogin";
import brandLogoTechpro from "../../assets/images/techpro-images/brand.png";
import DefaultNavbarDropdown from "./DefaultNavbarDropdown";
import DefaultNavbarMobile from "./DefaultNavbarMobile";
import { useNavigate } from "react-router-dom";
import "./header.scss";

const LOGIN = 'Đăng nhập'
const LOGOUT = 'Đăng xuất'

function TPAppHeader({ transparent, light, action, relative, center }) {

  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const location = useLocation();

  const menuNavbar = [
    {
      name: "Đang học",
      icon: <Icon>dashboard</Icon>,
      route: "/current-courses",
    },
    {
      name: "Khóa học",
      icon: <Icon>view_day</Icon>,
      route: "/all-courses",
    },
    {
      name: "Vào thi",
      icon: <Icon>article</Icon>,
      route: "/list-exams",
    },
    {
      name: "Liên hệ",
      icon: <Icon>contacts</Icon>,
      route: "/list-exams",

    },
  ];

  const openMobileNavbar = () => setMobileNavbar(!mobileNavbar);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  const renderNavbarItems = menuNavbar.map(
    ({ name, icon, href, route, collapse }) => (
      <DefaultNavbarDropdown
        key={name}
        name={name}
        icon={icon}
        route={route}
        collapse={Boolean(collapse)}
      />
    )
  );

  if (location.pathname.match("/sign-in")) {
    return null;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Container className='header__wrapper'>
      <MKBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={relative ? 0 : 2}
        mx={relative ? 0 : 3}
        width={relative ? "100%" : "calc(100% - 48px)"}
        borderRadius='xl'
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        left={0}
        zIndex={3}
        sx={({
          palette: { transparent: transparentColor, white },
          functions: { rgba },
        }) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <MKBox
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Link to='/'>
            <MKBox
              lineHeight={1}
              py={transparent ? 1.5 : 0.75}
              pl={relative || transparent ? 0 : { xs: 0, lg: 1 }}
            >
              <img src={brandLogoTechpro} height='36px' />
            </MKBox>
          </Link>

          <MKBox
            color='inherit'
            display={{ xs: "none", lg: "flex" }}
            ml='auto'
            mr={center ? "auto" : 0}
          >
            {renderNavbarItems}
          </MKBox>
          <MKBox ml={{ xs: "auto", lg: 0 }}>
            <Link to='/sign-in'>
              <MKButton
                variant={
                  action.color === "white" || action.color === "default"
                    ? "contained"
                    : "gradient"
                }
                color={action.color ? action.color : "info"}
                size='small'
                onClick={logout}
              >
                {LOGOUT}
              </MKButton>
            </Link>
          </MKBox>
          <MKBox
            display={{ xs: "inline-block", lg: "none" }}
            lineHeight={0}
            py={1.5}
            pl={1.5}
            color={transparent ? "white" : "inherit"}
            sx={{ cursor: "pointer" }}
            onClick={openMobileNavbar}
          >
            <Icon fontSize='default'>{mobileNavbar ? "close" : "menu"}</Icon>
          </MKBox>
        </MKBox>
        <MKBox
          bgColor={transparent ? "white" : "transparent"}
          shadow={transparent ? "lg" : "none"}
          borderRadius='xl'
          px={transparent ? 2 : 0}
        >
          {mobileView && (
            <DefaultNavbarMobile menuNavbar={menuNavbar} open={mobileNavbar} />
          )}
        </MKBox>
      </MKBox>
    </Container>
  );
}


export default TPAppHeader;
