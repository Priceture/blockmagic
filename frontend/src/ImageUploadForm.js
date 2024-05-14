// import 'dotenv/config.js'
import React, { useState } from "react"; // make sure to configure this
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from 'uuid';

function ImageUploadForm() {
  // setup stage for image upload
  const [image, setImage] = useState(null);
  const [generateImageStatus, setGenerateImageStatus] = useState(null);

  // API token for Imagine API
  const imagine_api_token = "sbac0GOtT6UoDni3tGQMT3K_FxeSsqIn";

  // Firebase configuration and initialization
  const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "priceture.firebaseapp.com",
    databaseURL: "https://DATABASE_NAME.firebaseio.com",
    projectId: "priceture",
    storageBucket: "priceture.appspot.com",
    messagingSenderId: "754334414708",
    appId: "APP_ID",
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  // handle image upload
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // upload image to firebase storage
  const handleUpload = async (e) => {
    e.preventDefault();
    setGenerateImageStatus("process");
    if (image) {
      // remove spaces from image name to prevent error in Midjourney API
      const imageExtension = image.name.split('.').pop();
      const imageName = uuidv4() + '.' + imageExtension;

      // specify the image reference on Firebase storage
      const imageRef = ref(storage, `images/${imageName}`);
      try {
        await uploadBytes(imageRef, image);
        alert("Image uploaded successfully!");
        console.log(
          `Your image URL is : https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/images%2F${imageName}?alt=media`
        );
      } catch (error) {
        console.error("Error uploading image: ", error);
      }

      // Generate 4 images on imagine API based on the uploaded image URL
      const prompt = [
        {
          prompt: `https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/images%2F${imageName}?alt=media enhance the expression of object or person to feel miserable and very sad while keeping the posture of character and background remains unchanged --w 0 --s 500`,
        },
        {
          prompt: `https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/images%2F${imageName}?alt=media enhance the expression of object or person to feel a bit sad while keeping the posture of character and background remains unchanged --w 0 --s 500`,
        },
        {
          prompt: `https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/images%2F${imageName}?alt=media enhance the expression of object or person to feel a bit happier while keeping the posture of character and background remains unchanged --w 0 --s 500`,
        },
        {
          prompt: `https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/images%2F${imageName}?alt=media enhance the expression of object or person to feel very happy and full of joy while keeping the posture of character and background remains unchanged --w 0 --s 500`,
        },
      ];

      // we wrap it in a main function here so we can use async/await inside of it.
      async function generateImage(i) {
        return new Promise(async (resolve, reject) => {
          let promptResponseData;

          // generate the image
          try {
            const response = await fetch(
              "https://cl.imagineapi.dev/items/images/",
              {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + imagine_api_token,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(prompt[i]),
              }
            );

            promptResponseData = await response.json();
            console.log(promptResponseData);
          } catch (error) {
            console.error("Error generating image:", error);
            throw error;
          }

          // check if the image has finished generating
          let counter = 0;
          const maxAttempts = 20;

          const intervalId = setInterval(async function () {
            try {
              console.log("Checking image details");
              const response = await fetch(
                `https://cl.imagineapi.dev/items/images/${promptResponseData.data.id}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: "Bearer " + imagine_api_token,
                    "Content-Type": "application/json",
                  },
                }
              );

              const responseData = await response.json();
              if (
                responseData.data.status === "completed" ||
                responseData.data.status === "failed"
              ) {
                // img generation done, stop repeating
                clearInterval(intervalId);
                console.log("Result: ", responseData.data);

                // setup metadata for each round of image geneartion
                let metadata = {
                  name: "Priceture NFT",
                  description: "Your Price, Your Mood, Your NFT",
                  image: responseData.data.upscaled_urls[0],
                  attributes: [
                    {
                      trait_type: "Feeling",
                      value: `${
                        i === 0
                          ? "Very Sad"
                          : i === 1
                          ? "Sad"
                          : i === 2
                          ? "Happy"
                          : "Very Happy"
                      }`,
                    },
                  ],
                };

                resolve(metadata); // Resolve the Promise with metadataArray
              } else {
                console.log(
                  "Image is not finished generation. Status: ",
                  responseData.data.status
                );
                counter++;
                if (counter >= maxAttempts) {
                  clearInterval(intervalId);
                  console.log(
                    "Exceeded maximum attempts. Stopping image generation."
                  );
                }
              }
            } catch (error) {
              console.error("Error getting updates", error);
              throw error;
            }
          }, 30000 /* every 3 seconds */);
        });
      }

      // create metadata JSON for NFT
      async function createMetaData() {
        let allMetadata = [];
        for (let i = 0; i < prompt.length; i++) {
          let metadata = await generateImage(i);
          console.log("the metadata for this image generation is: " + metadata);
          allMetadata.push(metadata);
        }

        if (allMetadata.length > 3) {
          const metadata = {
            file: allMetadata,
          };
          const jsonString = JSON.stringify(metadata);
          const blob = new Blob([jsonString], { type: "application/json" });
          const imageNameWithOutExtension = imageName.split(".")[0];
          const jsonFileName = imageNameWithOutExtension + ".json";

          // to be updated the location path
          const jsonRef = ref(storage, `json/${jsonFileName}`);

          try {
            await uploadBytes(jsonRef, blob);
            console.log(
              `Your JSON metada URL is : https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/json%2F${jsonFileName}?alt=media`
            );
          } catch (error) {
            console.error("Error uploading json: ", error);
          }
        } else {
          console.log("Error in creating metadata.");
        }
      }

      async function createMetaDataFunction() {
        await createMetaData();
        setGenerateImageStatus("done");
        console.log("Generate Image Status: ", generateImageStatus);
      }
      createMetaDataFunction();

      // if users do not upload anything
    } else {
      alert("Please select an image to upload");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        <button type="submit" disabled={generateImageStatus === "process"}>
          {generateImageStatus === "process"
            ? "Generating images... wait 3 minutes"
            : generateImageStatus === "done"
            ? "Next"
            : "Upload Image"}
        </button>
      </form>
    </div>
  );
}

export default ImageUploadForm;
