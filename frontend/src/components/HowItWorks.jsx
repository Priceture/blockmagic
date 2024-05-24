import React from "react";
import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import step4 from "../assets/step4.png";

export default function HowItWorks() {
  const info = [
    {
      image: step1,
      title: "Upload Image",
      details: "It can be selfie, pet photo, paint, art.",
    },
    {
      image: step2,
      title: "Img-To-Img AI",
      details: "Generate your image to have different moods.",
    },
    {
      image: step3,
      title: "Select Condition",
      details: "Choose your price tiers and digital asset that you care for.",
    },
    {
      image: step4,
      title: "Dynamic NFT",
      details: "The NFT will change their mood based on your conditions.",
    },
  ];
  return (
    <div id="howitworks" className="homepageCard">
      <div className="mainContent__header">
        <div className="mainContent__header-stepname">How It Works</div>
        <div className="mainContent__header-explain">
          It's Dynamic NFT That is Based On Your Condition.
        </div>
      </div>
      <div className="flex gap-4 justify-center mt-4">
        {info.map((item) => (
          <div className="w-72 h-96  bg-black/[.4] rounded-lg flex flex-col items-center p-8 gap-4">
            <img className="w-48 h-48" src={item.image} alt="how it works" />
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-semibold">{item.title}</p>
              <p>{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
