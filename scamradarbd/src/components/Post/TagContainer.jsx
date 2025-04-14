import React from "react";

const TagContainer = ({ tags }) => {
  // Predefined list of Tailwind CSS color classes
  const colors = [
    "bg-blue-500 text-white",
    "bg-gray-500 text-white",
    "bg-purple-500 text-white",
    "bg-gray-300 text-gray-800",
    "bg-cyan-500 text-white",
    "bg-green-500 text-white",
    "bg-yellow-500 text-yellow-900",
    "bg-red-500 text-white",
  ];

  return (
    <div className="flex bg-transparent flex-row flex-wrap gap-2 p-2">
      <div className="font-bold">Tags:&nbsp;</div>
      {tags.map((tag) => {
        // Randomly select a color for each tag
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div key={tag} className="flex flex-row">
            <div
              className={`px-3 py-1 rounded-lg text-sm font-medium ${randomColor}`}
            >
              #{tag}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TagContainer;
