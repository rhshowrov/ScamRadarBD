const TopLocations = ({ locations }) => {
  const colors = [
    "bg-purple-500", // Electric Violet (Vibrant Purple)
    "bg-[#95700a]", // Neon Cyan (Custom Bright Teal)
    "bg-red-400", // Coral Pink (Soft Warm Pink)
    "bg-lime-100", // Acid Green (Highlighter Green)
    "bg-blue-800", // Deep Sapphire (Rich Dark Blue)
    "bg-orange-500", // Sunset Orange (Warm Orange)
    "bg-yellow-600", // Cyber Yellow (Glowing Yellow)
    "bg-fuchsia-500", // Magenta Pop (Vibrant Pink-Purple)
    "bg-emerald-700", // Dark Emerald (Deep Green)
    "bg-[#273838]", // Steel Teal (Cool Blue-Green)
  ];
  if (locations.length == 0) {
    return <div>Not data Found</div>;
  }
  return (
    <div className="">
      <h1 className="text-md p-1 font-bold text-center mt-2 bg-rose-400 w-1/3 rounded border-r-2">
        Top Locations:
      </h1>
      <div className="flex flex-row flex-wrap mt-1 gap-1">
        {locations.map((location, index) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              className={` p-1 m-1 text-white mb-2  rounded-md text-sm font-md ${randomColor}`}
              key={index}
            >
              {location}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TopLocations;
