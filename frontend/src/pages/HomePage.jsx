import React from "react";
import WhatIsPricture from "../components/WhatIsPricture";
import HowItWorks from "../components/HowItWorks";
import OurTeam from "../components/OurTeam";

function HomePage() {
  return (
    <div className="homepage">
      <WhatIsPricture />
      <HowItWorks />
      <OurTeam />
    </div>
  );
}

export default HomePage;
