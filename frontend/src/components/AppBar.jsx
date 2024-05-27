import * as React from "react";
import { useContext } from "react";
import pricturelogo from "../assets/pricturelogo.svg";

import { Box, Toolbar, Button } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

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
