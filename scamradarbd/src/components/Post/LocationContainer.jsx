const LocationContaier = ({ location }) => {
  return (
    <div className="flex flex-row p-2 items-center">
      <div className="font-bold">Location:&nbsp;</div>
      <span>{location}</span>
    </div>
  );
};
export default LocationContaier;
