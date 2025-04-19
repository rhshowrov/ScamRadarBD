import { Link, useLocation } from "react-router-dom";

const HomeBar = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type"); // Get 'type' from the query string

  const getLinkClass = (linkType) =>
    `border-x-indigo-500 border-x font-bold border-b border-b-indigo-500 p-2 rounded  hover:border-b-3 ${
      type === linkType ? "text-blue-600 border-b-2 border-blue-600" : ""
    }`;

  return (
    <div className="flex flex-row rounded justify-between flex-wrap p-2 mb-2">
      <Link to="/sort?type=trending" className={getLinkClass("trending")}>
        Trending
      </Link>
      <Link to="/sort?type=most_liked" className={getLinkClass("most_liked")}>
        Most Liked
      </Link>
      <Link
        to="/sort?type=most_commented"
        className={getLinkClass("most_commented")}
      >
        Most Commented
      </Link>
      <Link to="/sort?type=newest" className={getLinkClass("newest")}>
        Newest
      </Link>
    </div>
  );
};

export default HomeBar;
