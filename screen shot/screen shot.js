const screenShotbtn = document.querySelector("#src-btn");
const screenshotPreview = document.querySelector(".src-preview");
const closeBtn = screenshotPreview.querySelector("#close-btn");

const captureScreen = async () => {
    try{
        const stream = await navigator.mediaDevices.getDisplayMedia({preferCurrentTab:true});
        const video = document.createElement("video");
        
        video.addEventListener("loadedmetadata", () =>{
            const  canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            video.play();
            ctx.drawImage(video, 0, 0, canvas.width , canvas.height);
            stream.getVideoTracks()[0].stop();
            // document.body.appendChild(canvas);
            screenshotPreview.querySelector("img").src = canvas.toDataURL();
            screenshotPreview.classList.add("show");
        });
        video.srcObject = stream;
        // console.log(stream);
    }catch (error) {
        // console.log(error);
        alert ("Failed to capture screenshot!");
    }
}

closeBtn.addEventListener("click", () => screenshotPreview.classList.toggle("show"));
screenShotbtn.addEventListener("click", captureScreen);