import { useEffect, useState } from "react";
import api from "../../api/api";

const ImageContainer = ({ id }) => {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Track the clicked image

  // Disable scrolling when the modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [selectedImage]);

  useEffect(() => {
    // Define the async function to fetch images
    const fetchImages = async () => {
      try {
        const res = await api.get(`api/post/post_images/${id}`);
        console.log(res.data);
        setImageList(res.data.images); // Update the image list with the API response
        setError(""); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Error Occurred!"); // Set error message
        setImageList([]); // Clear the image list in case of error
      } finally {
        setLoading(false); // Set loading to false after the API call completes
      }
    };

    // Call the async function
    fetchImages();
  }, [id]); // Re-run effect when `id` changes

  // Function to handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the clicked image
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null); // Clear the selected image
  };

  if (loading) {
    return <p>Loading images...</p>; // Show loading message
  }

  if (error) {
    return <p>{error}</p>; // Show error message
  }

  return (
    <div>
      {/* Image Grid */}
      <div className="grid grid-cols-2 rounded sm:grid-cols-3 md:grid-cols-4 gap-1 w-full">
        {imageList.map((image, index) => (
          <div
            key={index}
            className="w-full aspect-square cursor-pointer"
            onClick={() => handleImageClick(image)} // Open modal on image click
          >
            <img
              src={image} // Use the image URL from the API response
              alt={`Image ${index + 1}`}
              className="w-auto h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="relative bg-white p-1 rounded-md max-w-[90vw] max-h-[90vh] overflow-auto">
            {/* Close Icon */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 p-2 bg-black rounded-full shadow-lg hover:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image */}
            <img
              src={selectedImage} // Display the selected image in full size
              alt="Selected Image"
              className="w-full h-auto max-w-[80vw] max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageContainer;
