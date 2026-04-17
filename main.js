// const stage = new Konva.Stage({
//   container: "container",
//   width: window.innerWidth,
//   height: window.innerHeight,
// });

// const layer = new Konva.Layer();
// stage.add(layer);

// main KONVA API for Impprting Image
// const imageObj = new Image();
// imageObj.onload = function () {
//   const hollow = new Konva.Image({
//     x: 100,
//     y: 50,
//     image: imageObj,
//     width: 260,
//     height: 200,
//   });

//   layer.add(hollow);
// };
// imageObj.src = "https://static.wikia.nocookie.net/disneythehunchbackofnotredame/images/6/68/Hollow_Ichigo.jpg/revision/latest?cb=20140312233035";

// Cropper.JS Implementation
document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("inputImage");
  const croppedImage = document.getElementById("croppedImage");
  const cropButton = document.getElementById("cropButton");
  const downloadButton = document.getElementById("downloadButton");

  let cropper;

  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        croppedImage.src = e.target.result;
        croppedImage.classList.remove("hidden");

        // Destroys previous cropper instance before creating a new one, preventing ERRORS
        if (cropper) {
          cropper.destroy();
        }

        // Loading Cropper Functions
        cropper = new Cropper(croppedImage, { aspectRatio: 1, viewMode: 1 });
        cropButton.style.display = "inline-block";
      };
      reader.readAsDataURL(file);
    }
  });
  cropButton.addEventListener("click", () => {
    const croppedDataURL = cropper.getCroppedCanvas().toDataURL();
    croppedImage.src = croppedDataURL;
    downloadButton.style.display = "inline-block";
  });
  downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = croppedImage.src;
    link.download = "cropped_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
