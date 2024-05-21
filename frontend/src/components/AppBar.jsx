import * as React from "react";
import { useContext } from "react";

import pricturelogo from "../assets/pricturelogo.svg";
import {
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuIcon,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

export default function AppBar() {
  //   const { goToRegisterPage } = useContext(AppContext);
  const navigate = useNavigate();
  const handleGoToRegister = (event) => {
    event.preventDefault();
    navigate("/register");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static" sx={{ backgroundColor: "#400e32" }}>
        <Toolbar
          display="flex"
          alignitems="center"
          sx={{ justifyContent: "space-between" }}
        >
          <Box component="div" display="flex" alignitems="center" gap="16px">
            <img src={pricturelogo}></img>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, color: "#F2cd5C" }}
            >
              PRICTURE
            </Typography>
          </Box>

          <Box display="flex" sx={{ gap: "24px" }}>
            <Box display="flex">
              <Button color="inherit" className="button" sx={{ flexGrow: 1 }}>
                WHAT IS PRICTURE
              </Button>
              <Button color="inherit" className="button" sx={{ flexGrow: 1 }}>
                HOW IT WORKS
              </Button>
              <Button color="inherit" className="button" sx={{ flexGrow: 1 }}>
                SHOWCAST
              </Button>
              <Button color="inherit" className="button" sx={{ flexGrow: 1 }}>
                OUR TEAM
              </Button>
            </Box>
            <Button
              onClick={handleGoToRegister}
              color="inherit"
              className="button"
              sx={{ color: "black", backgroundColor: "#F2cd5C" }}
            >
              GET STARTED
            </Button>
          </Box>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
