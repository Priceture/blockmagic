require('dotenv').config();
const imagine_api_token = process.env.IMAGINE_API_TOKEN;
 
const data = {
    prompt: "https://imageio.forbes.com/specials-images/imageserve/618e9029984a5e65860f9cff/0x0.jpg make this person happier" // to update prompt
};
 
// we wrap it in a main function here so we can use async/await inside of it.
async function generateImage() {
    let promptResponseData;
    // generate the image
    try {
        const response = await fetch('https://cl.imagineapi.dev/items/images/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + imagine_api_token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
 
        promptResponseData = await response.json();
        console.log(promptResponseData);
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
 
    // check if the image has finished generating
    // let's repeat this code every 5000 milliseconds (5 seconds, set at the bottom)
    let counter = 0;
    const maxAttempts = 20;

    const intervalId = setInterval(async function () {
        try {
            console.log('Checking image details');
            const response = await fetch(`https://cl.imagineapi.dev/items/images/${promptResponseData.data.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '  + imagine_api_token, 
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();
            if (responseData.data.status === 'completed' || responseData.data.status === 'failed') {
                // stop repeating
                clearInterval(intervalId);
                console.log('Completed image details', responseData.data);
            } else {
                console.log("Image is not finished generation. Status: ", responseData.data.status);
                counter++;
                if (counter >= maxAttempts) {
                    clearInterval(intervalId);
                    console.log('Exceeded maximum attempts. Stopping image generation.');
                }
            }
        } catch (error) {
            console.error('Error getting updates', error);
            throw error;
        }
    }, 10000 /* every 10 seconds */);
}
 
generateImage();