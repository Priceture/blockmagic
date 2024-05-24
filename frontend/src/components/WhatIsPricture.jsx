import React, { useContext } from "react";
import { Button } from "@mui/material";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import monalisaGif from "../assets/monalisa.gif";
export default function WhatIsPricture() {
  const { pageCount, setPageCount } = useContext(AppContext);
  const navigate = useNavigate();
  const handleGoToRegister = (event) => {
    event.preventDefault();
    if (pageCount === 0) {
      navigate("/register");
    } else setPageCount(0);
  };
  return (
    <div id="whatispriceture" className="homepageCard">
      <div className="flex  gap-16">
        <div className="w-2/3 flex flex-col items-start">
          <p className="homepage_slogan">Your Price</p>
          <p className="homepage_slogan">Your Mood</p>
          <p className="homepage_slogan">Your NFT</p>
          <p className="mainContent__header-explain w-50 pb-8">
            Transform your art into a mood-reflective masterpiece that shifts
            with the emotional currents you care about - prices, sports teams,
            and more.
          </p>
          <Button
            onClick={handleGoToRegister}
            color="inherit"
            className="button"
            sx={{ color: "black", backgroundColor: "#F2cd5C" }}
          >
            GET STARTED
          </Button>
        </div>
        <img className="w-1/3 grow" src={monalisaGif} alt="monalisa image" />
      </div>
    </div>
  );
}
