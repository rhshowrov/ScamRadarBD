import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlace } from "../../store/place";

const AddPlace = ({ setPlace }) => {
  const [selectedValue, setSelectedValue] = useState(null); // Initialize to null

  // Access places, status, error, and loading from the Redux store
  const { places, status, error, loading } = useSelector(
    (store) => store.place
  );

  const dispatch = useDispatch();

  // Fetch places when the component mounts
  useEffect(() => {
    dispatch(getPlace());
  }, [dispatch]);

  // Update selectedValue when places data is available
  useEffect(() => {
    if (places.length > 0) {
      setSelectedValue(places[0].id); // Set to the first place's ID
      setPlace(places[0].id); // Update the parent component's state
    }
  }, [places, setPlace]);

  const handleSelect = (e) => {
    const value = parseInt(e.target.value); // Convert to integer if needed
    setSelectedValue(value);
    setPlace(value); // Update the parent component's state
  };

  return (
    <div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-lg">
          Select The category from option
        </legend>

        {/* Show loading state */}
        {loading && (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner text-primary"></span>
            <p className="ml-2">Loading places...</p>
          </div>
        )}

        {/* Show error message if there's an error */}
        {error && (
          <div className="alert alert-error shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error: {error}</span>
          </div>
        )}

        {/* Show select dropdown only if status is true and no error */}
        {status && !error && !loading && (
          <select
            value={selectedValue || ""} // Fallback to empty string if selectedValue is null
            className="select select-bordered w-1/3"
            onChange={handleSelect}
          >
            {places.map((place) => (
              <option key={place.id} value={place.id.toString()}>
                {place.name}
              </option>
            ))}
          </select>
        )}
      </fieldset>
    </div>
  );
};

export default AddPlace;
