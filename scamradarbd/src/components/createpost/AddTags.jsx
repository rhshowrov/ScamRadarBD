import { useState } from "react";

const AddTags = ({ tags, addTag }) => {
  const [tag, setTag] = useState("");
  const [tagColors, setTagColors] = useState({}); // Store colors for each tag

  // Array of button color classes
  const buttonColors = [
    "btn-primary",
    "btn-secondary",
    "btn-accent",
    "btn-info",
    "btn-success",
    "btn-warning",
    "btn-error",
  ];

  // Function to get a random color class
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * buttonColors.length);
    return buttonColors[randomIndex];
  };

  // Function to handle adding a tag
  const handleAddTag = (e) => {
    e.preventDefault();
    if (tag.trim() !== "") {
      addTag(tag);
      // Assign a random color to the new tag
      setTagColors((prevColors) => ({
        ...prevColors,
        [tag]: getRandomColor(),
      }));
      setTag("");
    }
  };

  return (
    <div className="flex flex-col">
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-lg">Add Tags</legend>
        <div className="flex items-center gap-2">
          <input
            className="input w-[100px]"
            value={tag}
            required={!tags}
            placeholder="tags"
            onChange={(e) => setTag(e.target.value)}
          />
          <button className="btn btn-active btn-success" onClick={handleAddTag}>
            Add
          </button>
        </div>
      </fieldset>
      {/* Render all tags with their assigned colors */}
      <div className="flex flex-row justify-start flex-wrap">
        {tags.length !== 0 &&
          tags.map((tag, index) => (
            <button
              key={index} // Add a unique key for each tag
              className={`btn h-[20px] mr-1 mt-1 ${tagColors[tag] || "btn-primary"}`} // Use the assigned color or a default
            >
              {`#${tag}`}
            </button>
          ))}
      </div>
    </div>
  );
};

export default AddTags;