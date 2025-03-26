import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddTags from "./AddTags";
import AddPlace from "./AddPlace";
import AddImage from "./AddImage";
import { createPost } from "../../store/postSlice";

const CreatePost = () => {
  const { success, error, loading } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState([]);
  const [link, setLink] = useState("");
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState();
  const [img, setImage] = useState([]);

  // Function to add tags
  const addTags = (value) => {
    setTags([...tags, value]);
  };

  // Function to add images
  const addImg = (files) => {
    setImage([...img, ...files]); // Append new files to the existing `img` array
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a FormData object
    const formData = new FormData();
    // Append all form values to the FormData object
    formData.append("details", details);
    formData.append("link", link);
    formData.append("location", location);
    formData.append("place", place);
    // Append tags as individual fields
    tags.forEach((tag, index) => {
      formData.append("tags", tag);
    });

    // Append each image file
    img.forEach((file, index) => {
      formData.append("images", file); // Use `images` as the field name
    });
    // Dispatch the `createPost` action with the FormData
    dispatch(createPost(formData));
  };

  // Reset form fields on success
  useEffect(() => {
    if (success) {
      setDetails("");
      setTags([]);
      setLink("");
      setLocation("");
      setPlace();
      setImage([]);
    }
  }, [success, error, loading]);

  return (
    <div className="flex flex-col card shadow-sm bg-transparent mt-2 p-3">
      <h1 className="card-title text-2xl text-center font-normal mb-1">
        Create Your Post
      </h1>
      <hr />
      {/*success message */}
      {success && (
        <div className="alert alert-success shadow-lg mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Success! Your post has been created.</span>
        </div>
      )}

      {/* Display error message */}
      {error && (
        <div className="alert alert-error shadow-lg mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error: {error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-control">
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">
            Write Details about your experience
          </legend>
          <textarea
            className="textarea w-full min-h-35"
            value={details}
            required
            placeholder="details"
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </fieldset>
        <AddTags addTag={addTags} tags={tags} />
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">
            Share the location of the Scam
          </legend>
          <input
            className="input w-full"
            type="text"
            value={location}
            placeholder="Example: Banani, Dhaka"
            onChange={(e) => setLocation(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">Share Site Link</legend>
          <input
            className="input w-full"
            type="link"
            value={link}
            placeholder="Example: www.scammerbd.com"
            onChange={(e) => setLink(e.target.value)}
          />
        </fieldset>
        <AddPlace setPlace={setPlace} />
        <AddImage addImg={addImg} />
        {/* Display the selected images for debugging */}
        <div>
          {img && img.length > 0 && (
            <>
              <h2>Selected Images:</h2>
              <ul>
                {img.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="flex flex-row justify-end">
          <button
            type="submit"
            className="btn w-1/3 btn-primary mt-4"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
                Submitting...
              </>
            ) : (
              "Submit Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
