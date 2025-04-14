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
    const getStatus = async () => {
      try {
        const res = await api.get(`api/post/bookmark/${id}`);
        setMarkStatus(res.data.bookmark);
      } catch (error) {
        if (!error.response) {
          console.log("Check Internet Status");
        } else {
          setMarkStatus(false);
        }
      }
    };
    getStatus();
  }, [id]);

  return (
    <div>
      {mark_status ? (
        <SolidBookmarkIcon
          className="w-6 h-6 cursor-pointer text-blue-600"
          onClick={toogleBookmarkStatus}
        />
      ) : (
        <OutLineBookmarkIcon
          className="w-6 h-6 cursor-pointer text-white"
          onClick={toogleBookmarkStatus}
        />
      )}
    </div>
  );
};

export default Bookmark;
