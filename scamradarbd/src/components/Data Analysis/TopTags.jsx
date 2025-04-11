const TopTags = ({ tags }) => {
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
  if (tags.length == 0) {
    return <div>Not data Found</div>;
  }
  return (
    <div className="">
      <h1 className="text-md p-1 font-bold text-center  mt-2 bg-green-600 w-1/4 rounded border-r-2">
        Top Tags:
      </h1>
      <div className="flex flex-row flex-wrap mt-2">
        {tags.map((tag, index) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={index}
              className={` p-1 m-1  rounded-md text-sm font-md ${randomColor}`}
            >
              #{tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TopTags;
