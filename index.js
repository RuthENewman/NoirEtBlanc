const input = document.querySelector('input[type="file"]');
function handleFiles(files) {
  console.log(input.files)
  const reader = new FileReader(files);
  reader.onload = function(){

    const img = new Image();

    img.onload = function() {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.drawImage(img,0,0);

      // images = document.querySelectorAll('img')
      // image = images[1]
      // image.style.filter = 'grayscale(1)'

      // const imageData = context.getImageData(0,0,canvas.width, canvas.height);
      // const data = imageData.data;
      // for (let i = 0; i <= data.length; i += 4) {
      //   const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      //   data[i] = avg;
      //   data[i + 1] = avg;
      //   data[i + 2] = avg;
      // }

      // context.putImageData(imageData, 0, 0);

      // canvas.toBlob(function(blob) {
      //   const form = new FormData()
      //   form.append('image', blob);
      //   const xhr = new XMLHttpRequest();
      //   xhr.open('POST', '/imageupload', true)
      //   xhr.send(form);
      // })
    }
    img.src = reader.result;
    img.style.filter = 'grayscale(1)';
    document.body.appendChild(img);
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
