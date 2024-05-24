import React, { useContext } from "react";
import { Button } from "@mui/material";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
function GetStartBtn() {
  const { pageCount, setPageCount } = useContext(AppContext);
  const navigate = useNavigate();
  const handleGoToRegister = (event) => {
    event.preventDefault();
    if (pageCount === 0) {
      navigate("/register");
    } else setPageCount(0);
  };
  return (
    <Button
      onClick={handleGoToRegister}
      color="inherit"
      className="button"
      sx={{ color: "black", backgroundColor: "#F2cd5C" }}
    >
      GET STARTED
    </Button>
  );
}

export default GetStartBtn;
