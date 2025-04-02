import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Add these imports
import api from "../../api/api";
import PostCard from "../Post/PostCard";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // Get current search params
  const [search, setSearch] = useState(false);
  // Initialize searchInput from URL if it exists
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState([]);
  const fields = ["User", "Tag", "Location", "Place", "Link", "Text"];
  const btnColor = [
    "btn-secondary",
    "btn-accent",
    "btn-info",
    "btn-warning",
    "btn-success",
  ];
  // Initialize filters from URL if they exist
  const [selectedFilters, setSelectedFilter] = useState(
    searchParams.get("filters")?.split(",") || []
  );
  const navigate = useNavigate();

  const toggleFilter = (field) => {
    const newFilters = selectedFilters.includes(field)
      ? selectedFilters.filter((f) => f !== field)
      : [...selectedFilters, field];
    setSelectedFilter(newFilters);
    
    // Update URL when filters change
    updateUrl(searchInput, newFilters);
  };

  const fieldMapping = {
    User: "user__username",
    Tag: "tags__name",
    Location: "location",
    Place: "place__name",
    Link: "link",
    Text: "details",
  };

  const apiCall = async (searchInput, selectedFilters) => {
    const search_fields = selectedFilters
      .map((filter) => fieldMapping[filter])
      .join(",");
    const response = await api.get("api/post/search_post/", {
      params: {
        search: searchInput,
        search_fields: search_fields,
      },
    });
    return response.data;
  };

  // Function to update URL
  const updateUrl = (query, filters) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (filters.length > 0) params.set("filters", filters.join(","));
    
    // Update URL without page reload
    navigate({ search: params.toString() }, { replace: true });
  };

  const handleSearch = async () => {
    setSearch(true);
    updateUrl(searchInput, selectedFilters); // Update URL when searching
    try {
      const response = await apiCall(searchInput, selectedFilters);
      setResults(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle pressing Enter key in search input
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchInput) {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="flex flex-row mt-2">
        <div className="input w-full rounded-xl">
          <input
            type="search"
            className=""
            required
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress} // Add key press handler
            placeholder="Search"
          />
        </div>
        <button
          className="btn btn-secondary rounded-xl h-9.5"
          disabled={!searchInput}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {searchInput && (
        <div className="flex flex-row mt-2 flex-wrap">
          <p className="p-2 font-light">Filter by:</p>
          <div className="flex flex-row flex-wrap gap-2">
            {fields.map((field) => {
              const isSelected = selectedFilters.includes(field);
              const randomColor =
                btnColor[Math.floor(Math.random() * btnColor.length)];
              return (
                <button
                  key={field} // Added key prop
                  className={`btn h-7 mt-2 btn-soft ${randomColor} ${
                    isSelected ? "btn-active" : ""
                  }`}
                  onClick={() => toggleFilter(field)}
                >
                  {field}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {!search && (
        <div className="">
          <p className="text-center text-bold mt-2 text-info">
            You haven't searched anything yet!!!
          </p>
        </div>
      )}
      <hr className="mt-2" />
      {search && (
        <div className="">
          <p className="text-center mb-2 text-bold mt-2 text-info">
            Showing Results for "{searchInput}"
          </p>
          {results?.length === 0 && (
            <div className="alert alert-error my-4">
              <span className=" font-medium">
                No posts found for this keyword!
              </span>
            </div>
          )}
          {results.map((post) => {
            return <PostCard className="w-auto" key={post.id} post={post} />;
          })}
          {results && (
            <div className="mt-4">{/* Render your results here */}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
