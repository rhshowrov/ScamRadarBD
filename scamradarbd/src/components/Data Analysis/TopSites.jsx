const TopSite = ({ sites }) => {
  if (sites.length == 0) {
    return <div>Not data Found</div>;
  }
  return (
    <div className="">
      <h1 className="text-md p-1 font-bold text-center p-1 mt-2 bg-fuchsia-500 w-1/4 rounded border-r-2">
        Top Sites:
      </h1>
      <div className="flex flex-row flex-wrap mt-1 justify-between">
        {sites.map((site, index) => (
          <div key={index}>
            <a
              href={"site"}
              className=" hover:underline text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              {site}
            </a>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopSite;
