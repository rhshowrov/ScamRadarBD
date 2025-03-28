import { useState } from "react";
import api from "../../api/api";

const Search = () => {
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState(null);
  const fields = ["User", "Tag", "Location", "Place", "Link", "Text"];
  const btnColor = [
    "btn-secondary",
    "btn-accent",
    "btn-info",
    "btn-warning",
    "btn-success",
  ];
  const [selectedFilters, setSelectedFilter] = useState([]);

  // Fixed filter toggling
  const toggleFilter = (field) => {
    if (selectedFilters.includes(field)) {
      // Properly create a new array without mutating state
      setSelectedFilter(selectedFilters.filter((f) => f !== field));
    } else {
      setSelectedFilter([...selectedFilters, field]);
    }
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
    console.log(search_fields);

    const response = await api.get("api/post/serach/", {
      params: {
        search: searchInput,
        search_fields: search_fields,
      },
    });
    return response.data;
  };
  const handleSearch = async () => {
    setSearch(true);
    try {
      const response = await apiCall(searchInput, selectedFilters);
      setResults(response);
    } catch (error) {
      console.log(error);
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
      {search && (
        <div className="">
          <p className="text-center mb-2 text-bold mt-2 text-info">
            Showing Results for "{searchInput}"
          </p>
          <hr />
          {/* Results would be displayed here */}
          {results && (
            <div className="mt-4">{/* Render your results here */}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
