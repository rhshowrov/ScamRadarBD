import { BookmarkIcon as OutLineBookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import api from "../../api/api";

const Bookmark = ({ id }) => {
  const [mark_status, setMarkStatus] = useState(false);

  const toogleBookmarkStatus = async () => {
    try {
      const res = await api.post(`api/post/bookmark/${id}`);
      setMarkStatus(res.data.bookmark); // update the state here
    } catch (error) {
      if (!error.response) {
        console.log("Check internet Status!");
      } else {
        console.log(error.response.data);
      }
      setMarkStatus(false);
    }
  };

  useEffect(() => {
    // initial fetch
    toogleBookmarkStatus();
  }, []);

  return (
    <div>
      {mark_status ? (
        <SolidBookmarkIcon
          className="w-6 h-6 cursor-pointer text-blue-600"
          onClick={toogleBookmarkStatus}
        />
      ) : (
        <OutLineBookmarkIcon
          className="w-6 h-6 cursor-pointer text-gray-500"
          onClick={toogleBookmarkStatus}
        />
      )}
    </div>
  );
};

export default Bookmark;
