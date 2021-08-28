const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let currentImg = "";
let webpImg = "";
let convertedImg = "";

function handleUploadedFile(ev){

  const file = ev.currentTarget.files[0];
  
  if(currentImg != "" || webpImg != "" || convertedImg != ""){
    URL.revokeObjectURL(currentImg);
    convertedImg = "";
    currentImg = "";
    webpImg = "";
  }
  
  currentImg = URL.createObjectURL(file);
  
  webpImg = new Image();
  
  webpImg.onload = ()=>{
     canvas.width = webpImg.naturalWidth;
     canvas.height = webpImg.naturalHeight;
     ctx.drawImage(webpImg, 0, 0, canvas.width, canvas.height);
     convertedImg = canvas.toDataURL("image/webp", 1.0);
     console.log(convertedImg);
  }
  
  webpImg.src = currentImg;
}