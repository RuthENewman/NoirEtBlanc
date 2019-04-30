const input = document.querySelector('input[type="file"]');
const displayImageDiv = document.querySelector('.displayImage');
function handleFiles(files) {
  const reader = new FileReader(files);
  reader.onload = function(){

    const img = new Image();

    img.onload = function() {
      if(displayImageDiv.children.length > 1) {
        displayImageDiv.removeChild(displayImageDiv.children[0]);
      }
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.drawImage(img,0,0);

      images = document.querySelectorAll('img')
      image = images[1]
      image.style.filter = 'grayscale(1)'

      const imageData = context.getImageData(0,0,canvas.width, canvas.height);
      const data = imageData.data;
      for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.width; y++) {
          let i = (y * 4) * imageData.width * x * 4;
          let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
      }

      context.putImageData(imageData, 0, 0);

    }
    img.src = reader.result;
    img.style.filter = 'grayscale(1)';

    displayImageDiv.appendChild(img);
  }
  reader.readAsDataURL(input.files[0]);
}

input.addEventListener('change', event => {
  handleFiles(input.files);
}, false)

document.addEventListener('dragover', event => {
  event.preventDefault();
  event.stopPropogation();
}, false)

document.addEventListener('drop', event => {
  event.preventDefault();
  event.stopPropogation();
  handleFiles(event.dataTransfer.files);
}, false)
