import { useState } from "react";

const AddImage = ({ addImg }) => {
  const [files, setFiles] = useState([]);

  // Function to handle file input changes
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
    setFiles(selectedFiles); // Update local state
    addImg(selectedFiles); // Pass the selected files to the parent component
  };

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-lg">
        Upload Images of the Scam
      </legend>
      <input
        type="file"
        multiple // Allow multiple file selection
        className="file-input"
        onChange={handleFileChange}
      />
    </fieldset>
  );
};

export default AddImage;