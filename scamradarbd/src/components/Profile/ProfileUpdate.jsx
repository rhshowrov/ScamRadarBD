import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../store/profileSlice";

const ProfileUpdate = () => {
  const { user } = useSelector((store) => store.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user || !user.username) {
      dispatch(getProfile());
    }
  }, [user, dispatch]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    first_name: "",
    last_name: "",
    profile_pic: "",
  });
  useEffect(() => {
    setFormData({
      username: user.username || "",
      email: user.email || "",
      mobile: user.mobile || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      profile_pic: user.profile_pic || "",
    });
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "profile_pic") {
        if (value instanceof File) {
          formDataSend.append(key, value);
        }
      } else {
        if (value !== "" && value !== null) {
          formDataSend.append(key, value);
        }
      }
    });
    dispatch(updateProfile(formDataSend));
  };

  return (
    <div className="mt-2">
      <form>
        <div className="flex flex-col ">
          <label htmlFor="username" className="font-bold p-1">
            Username:
          </label>
          <input
            className="bg-base-200 text-success rounded-md h-9 p-2  font-medium"
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
          />

          <label htmlFor="email" className="font-bold p-1">
            Email:
          </label>
          <input
            className="bg-base-200 rounded-md h-9 p-2 text-success font-medium"
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <label htmlFor="mobile" className="font-bold p-1">
            Mobile:
          </label>
          <input
            className="bg-base-200 rounded-md h-9 p-2 text-success font-medium"
            name="mobile"
            type="tel"
            placeholder="11 digit phone number"
            pattern="[01]{2}[0-9]{9}"
            value={formData.mobile}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mobile: e.target.value }))
            }
          />

          <label htmlFor="first_name" className="font-bold p-1">
            First Name:
          </label>
          <input
            className="bg-base-200 rounded-md h-9 p-2 text-success font-medium"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, first_name: e.target.value }))
            }
          />

          <label htmlFor="last_name" className="font-bold p-1">
            Last Name:
          </label>
          <input
            className="bg-base-200 rounded-md h-9 p-2 text-success font-medium"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, last_name: e.target.value }))
            }
          />
          <label htmlFor="profile_pic" className="font-bold p-1">
            Profile Picture:
          </label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            name="profile_pic"
            className="bg-base-200 rounded-md h-9 p-2  text-success font-medium"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                profile_pic: e.target.files[0],
              }))
            }
          />
        </div>
        <div className="flex my-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="h-9 min-w-30 ml-auto bg-red-600 rounded-md p-1 "
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProfileUpdate;
