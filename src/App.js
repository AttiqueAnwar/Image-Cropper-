import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { compressImage } from 'image-conversion';

function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.download = 'cropPreview.png';
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    'image/png',
    1
  );
}
function formatSize(sizeInBytes) {
  const KB = 1024;
  const MB = KB * 1024;

  if (sizeInBytes < KB) {
    return sizeInBytes + ' B';
  } else if (sizeInBytes < MB) {
    return (sizeInBytes / KB).toFixed(2) + ' KB';
  } else {
    return (sizeInBytes / MB).toFixed(2) + ' MB';
  }
}
function setCanvasImage(image, canvas, crop) {
  if (!crop || !canvas || !image) {
    return;
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext('2d');
  // refer https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
  const pixelRatio = window.devicePixelRatio;

  canvas.width = crop.width * pixelRatio * scaleX;
  canvas.height = crop.height * pixelRatio * scaleY;

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );
}

export default function App() {
  const [upImg, setUpImg] = useState();
  const [fileSize, setFileSize] = useState(0); // State for uploaded file size

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [crop, setCrop] = useState({ unit: 'px', width: 30, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [croppedFileSize, setCroppedFileSize] = useState(0); // State for cropped file size

  console.log(crop);

  // on selecting file we set load the image on to cropper
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setUpImg(reader.result);
        setFileSize(e.target.files[0].size); // Update uploaded file size
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);


  useEffect(() => {
    setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop);
  
    if (previewCanvasRef.current) {
      const quality = 0.8; // Adjust the quality value as needed
      const imageMimeType = 'image/jpeg'; // Change to 'image/png' if necessary
  
      // Convert the canvas data to a data URL with compressed quality
      const compressedDataUrl = previewCanvasRef.current.toDataURL(imageMimeType, quality);
  
      // Calculate the size of the compressed image
      const compressedSizeInBytes = compressedDataUrl.length;
  
      // Set the compressed file size state
      setCroppedFileSize(compressedSizeInBytes);
    }
  }, [completedCrop]);
  
  

  return (
    <div className='App'>
      <div>
        <input type='file' accept='image/*' onChange={onSelectFile} />
        <div>
          Uploaded File Size: {formatSize(fileSize)}
        </div>
      </div>
      <section
        style={{
          width: "50vw",
          margin: "1rem",
          border: "1px solid #ccc",
          padding: "1rem",
        }}
      >

      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      </section>
    <section
        style={{
          width: "50vw",
          margin: "1rem",
          border: "1px solid #ccc",
          padding: "1rem",
        }}
      >
        {/* Canvas to display cropped image */}
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </section>
Cropped File Size: {formatSize(croppedFileSize)}    
  <button
        type='button'
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() =>
          generateDownload(previewCanvasRef.current, completedCrop)
        }
      >
        Download cropped image
      </button>
    </div>
  );
}
