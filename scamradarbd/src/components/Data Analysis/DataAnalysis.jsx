import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnalyzedData } from "../../store/analyzedDataSlice";
import TopSite from "./TopSites";
import TopTags from "./TopTags";
import TopLocations from "./TopLocatons";
const DataAnalysis = () => {
  const { results, error, status, loading } = useSelector(
    (store) => store.analyzedData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnalyzedData());
  }, [dispatch]);
  if (results.length == 0) {
    return <div>No Data To be Shown!</div>;
  }
  if (error) {
    <div>{error}</div>;
  }
  if (loading) {
    <div>loading........</div>;
  }
  return (
    <div className="flex flex-col">
      <div className="mt-2 ">
        <h2 className="text-center p-2 mb-2 bg-base-200 text-info rounded-lg font-semi-bold text-lg">
          Analysis Results Of Our Data
        </h2>
      </div>
      <div className="bg-base-200 rounded-md p-2 mb-2">
        <TopSite sites={results.site_links} />
      </div>
      <div className="bg-base-200 rounded-md p-2 mb-2">
        <TopTags tags={results.tags} />
      </div>
      <div className="bg-base-200 rounded-md p-2 mb-2">
        <TopLocations locations={results.locations} />
      </div>
    </div>
  );
};
export default DataAnalysis;
