import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { getNotifications } from "../../store/notificationSlice";
import api from "../../api/api";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results = [], next } = useSelector((state) => state.notifications.data);
  const loading = useSelector((state) => state.notifications.loading);

  useEffect(() => {
    if (!results.length) {
      dispatch(getNotifications()); // initial load
    }
  }, [results.length, dispatch]);

  const handleNotificationClick = async (id, url) => {
    try {
      await api.post(`api/notification/${id}/read/`);
      navigate(url); // go after marking read
    } catch (err) {
      console.error("Notification read failed:", err);
    }
  };

  const loadMore = () => {
    if (next) {
      dispatch(getNotifications(next));
    }
  };

  const unreadCount = results.filter((r) => !r.is_read).length;

  return (
    <div>
      <h2 className="text-center p-2 text-xl bg-sky-500/10 font-bold text-green-500 rounded-md">Notifications</h2>

      {unreadCount > 0 && (
        <div role="alert" className="alert alert-warning alert-outline mt-2">
          <span className="font-bold">{unreadCount} unread {unreadCount === 1 ? "message" : "messages"}</span>
        </div>
      )}

      {results.map((result) => (
        <div
          key={result.id}
          onClick={() => handleNotificationClick(result.id, result.url)}
          role="alert" className="alert alert-info alert-dash my-3 cursor-pointer"
        >
          <p className={`px-2 ${result.is_read ? "text-white" : "text-pink-500"}`}>
            {result.message}
          </p>
          <p className="px-2 text-sm text-gray-500">
            {formatDistanceToNow(new Date(result.created_at), { addSuffix: true })}
          </p>
        </div>
      ))}

      {next && (
        <div className="text-center my-4">
          <button
            className="btn btn-outline btn-sm"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;

