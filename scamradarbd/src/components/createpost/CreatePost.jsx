import { useState } from "react";
import AddTags from "./AddTags";

const CreatePost = () => {
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState([]);
  const [link, setLink] = useState("");
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState();
  const [img, setImage] = useState([]);
  const addTags = (value) => {
    setTags([...tags, value]);
  };
  return (
    <div className="flex flex-col card  shadow-sm bg-base-100 mt-2 p-3">
      <h1 className="card-title text-2xl text-center font-normal mb-1">
        Create Your Post
      </h1>
      <hr />
      <form action="" className="form-control">
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">
            Write Details about your experince
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
            placeholder="Example:Banani,Dhaka"
            onChange={(e) => setLocation(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">
           Share Site Link
          </legend>
          <input
            className="input w-full"
            type="link"
            value={link}
            placeholder="Example:www.scammerbd.com"
            onChange={(e) => setLink(e.target.value)}
          />
        </fieldset>
      </form>
    </div>
  );
};
export default CreatePost;
