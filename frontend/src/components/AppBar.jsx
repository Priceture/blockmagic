import * as React from "react";
import { useContext } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import pricturelogo from "../assets/pricturelogo.svg";
// import pricture-logo from "../assets/pricture-logo.svg"

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
import { LogDescription } from "ethers";

export default function AppBar() {
  const { pageCount, setPageCount } = useContext(AppContext);
  const navigate = useNavigate();
  const handleGotoHomepage = () => {
    navigate("/");
  };
  const handleGoToRegister = (event) => {
    event.preventDefault();
    if (pageCount === 0) {
      navigate("/register");
    } else setPageCount(0);
  };

  // const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static" sx={{ backgroundColor: "#400e32" }}>
        <Toolbar
          display="flex"
          alignitems="center"
          sx={{ justifyContent: "space-between" }}
        >
          <Button>
            <Box
              onClick={handleGotoHomepage}
              component="div"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img
                className="prictureLogo"
                src={pricturelogo}
                alt="pricture logo"
              ></img>
            </Box>
          </Button>

          <Box display="flex" sx={{ gap: "24px" }}>
            {/* <Box display="flex"> */}
            {/* <Button color="inherit" className="button" sx={{ flexGrow: 1 }}>
                <Link to="#whatispriceture">WHAT IS PRICTURE</Link>
              </Button>
              <Button color="inherit" className="button" sx={{ flexGrow: 1 }}>
                <Link to="#howitworks">HOW IT WORKS</Link>
              </Button>
              <Button color="inherit" className="button" sx={{ flexGrow: 1 }}>
                <Link to="#ourteam">OUR TEAM</Link>
              </Button>
            </Box>
            <Route path="/" exact component={whatispricture} />
              <Route path="/" component={howitworks} />
              <Route path="/" component={ourteam} /> */}
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
