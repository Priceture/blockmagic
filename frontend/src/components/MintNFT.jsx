import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function MintNFT() {
  const { jsonUrl, setJsonUrl } = useContext(AppContext);
  // Mockup jsonUrl เอาไว้ก่อน เดี๋ยวดึงของจริงมา
  let mockjsonUrl = {
    file: [
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://cl.imagineapi.dev/assets/8b93e5a2-6553-4cea-9d5f-09d3eb37058b/8b93e5a2-6553-4cea-9d5f-09d3eb37058b.png",
        attributes: [{ trait_type: "Feeling", value: "Very Sad" }],
      },
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://cl.imagineapi.dev/assets/4c10c6ff-e707-427f-b890-0ba207903dce/4c10c6ff-e707-427f-b890-0ba207903dce.png",
        attributes: [{ trait_type: "Feeling", value: "Sad" }],
      },
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/images%2Fchainlinkphoto.jpeg?alt=media",
        attributes: [{ trait_type: "Feeling", value: "Normal" }],
      },
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://cl.imagineapi.dev/assets/e936801c-181c-41fb-9d46-da7b723f9508/e936801c-181c-41fb-9d46-da7b723f9508.png",
        attributes: [{ trait_type: "Feeling", value: "Happy" }],
      },
      {
        name: "Priceture NFT",
        description: "Your Price, Your Mood, Your NFT",
        image:
          "https://cl.imagineapi.dev/assets/2ba65eb7-53bc-475a-9d2c-6b3a25d3fbd0/2ba65eb7-53bc-475a-9d2c-6b3a25d3fbd0.png",
        attributes: [{ trait_type: "Feeling", value: "Very Happy" }],
      },
    ],
  };
  return (
    <div>
      <div>Preview your NFT</div>
      {/* <div>
        {mockjsonUrl.file.map((item) => (
          <img className="final_image" src={item.image} />
        ))}
      </div> */}
      <div>
        {jsonUrl?.file.map((item) => (
          <img className="final_image" src={item.image} />
        ))}
      </div>
    </div>
  );
}

export default MintNFT;
