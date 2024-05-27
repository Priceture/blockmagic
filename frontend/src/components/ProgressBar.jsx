import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  "Connect Wallet",
  "Upload Image ",
  "Select Asset",
  "Set Condition",
  "Mint NFT",
];

export default function ProgressBar({ pageCount, setPageCount }) {
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    setActiveStep(pageCount);
  }, [pageCount]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
