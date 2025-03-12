import { useState } from "react";
import AddTags from "./AddTags";
import AddPlace from "./AddPlace";
import AddImage from "./AddImage";

const CreatePost = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    // Append all form values to the FormData object
    formData.append("details", details);
    formData.append("link", link);
    formData.append("location", location);
    formData.append("place", place);

    // Append tags as a individual fields if needed
    formData.append("tags", JSON.stringify(tags));
    tags.forEach((tag, index) => {
      formData.append(`tags`, tag);
    });
    // Append each image file
    img.forEach((file, index) => {
      formData.append(`images`, file); // Use `images` as the field name
    });
    for (let [key, value] of formData.entries()) {
      console.log(key, value); // Logs: name John Doe, email john@example.com
    }
  };

  return (
    <div className="flex flex-col card shadow-sm bg-base-100 mt-2 p-3">
      <h1 className="card-title text-2xl text-center font-normal mb-1">
        Create Your Post
      </h1>
      <hr />
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
        <AddImage addImg={addImg} />{" "}
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
          <button type="submit" className="btn w-1/3 btn-primary mt-4">
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
