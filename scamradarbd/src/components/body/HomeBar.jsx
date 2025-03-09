import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const HomeBar = () => {
  return (
    <div className="flex flex-row rounded justify-between flex-wrap p-2 mb-2  ">
      <Link className="border-l border-r p-2 rounded  hover:border-b-2 ">Trending</Link>
      <Link className=" border-l border-r p-2 rounded hover:border-b-2">Most Liked</Link>
      <Link className=" border-l border-r p-2 rounded hover:border-b-2">Most Commented</Link>
      <Link className=" border-l border-r p-2 rounded hover:border-b-2">Newest</Link>
    </div>
  );
};
export default HomeBar;
