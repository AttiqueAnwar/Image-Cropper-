
# React Image Cropper and Compressor

This is a simple React application that demonstrates how to use the `react-image-crop` library to crop images and the `image-conversion` library to compress images. The app allows you to upload an image, crop it, and then download the cropped and compressed version of the image.

## Features

- Upload an image of your choice.
- Crop the uploaded image using the interactive crop tool.
- View the uploaded image with the selected crop.
- Compress the cropped image with adjustable quality.
- Download the cropped and compressed image.

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository.
2. Install the dependencies using `npm install`.
3. Start the development server with `npm start`.

## How It Works

1. Upload Image: Choose an image file to upload.
2. Crop Image: Use the crop tool to select the desired portion of the uploaded image.
3. Preview: View the cropped image preview in the canvas.
4. Compress: The cropped image is compressed with adjustable quality.
5. Download: Download the cropped and compressed image with a single click.

## Dependencies

- React: A JavaScript library for building user interfaces.
- `react-image-crop`: A library for interactive image cropping in React.
- `image-conversion`: A library for image compression.

## Usage

1. Select an image using the "Choose File" button.
2. Adjust the crop area by dragging the corners of the crop tool.
3. Observe the cropped image preview.
4. Use the "Download cropped image" button to save the cropped and compressed image.

## Notes

- The application uses the `react-image-crop` library for cropping images.
- The `image-conversion` library is used to compress the cropped image.
- Cropped image size is displayed for both original and compressed versions.

## License

This project is licensed under the MIT License. Feel free to use and modify the code according to your needs.

---

*For detailed implementation and code snippets, please refer to the [App.js](./src/App.js) file.*
