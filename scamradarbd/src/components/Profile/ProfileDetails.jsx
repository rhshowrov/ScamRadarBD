const ProfileDetails = () => {
  return (
    <div className="grid grid-row-2 gap-1  mt-2">
      <div className="row-span-1 bg-base-200 rounded-md">
        <div className="grid justify-items-center">
          <img
            className="w-30 h-30 rounded-full my-2 border-2  border-cyan-500"
            src="/profile.png"
            alt="User image"
          />
          <div className="text-lg">Rakibul Hasan Showrov</div>
        </div>
      </div>
      <div className="row-span-1 bg-base-200 p-2 mt-1 rounded-md grid grid-cols-6 gap-1  w-full">
        <div className="col-span-3 justify-items-start md:w-1/2 font-bold">
          <div>Username:</div>
          <div>Email:</div>

          <div>First Name:</div>
          <div>Last Name:</div>
          <div>Mobile:</div>
        </div>
        <div className="col-span-3 justify-items-start">
          <div>rakib</div>
          <div>rakib@gamil.com</div>
          <div>Rakib</div>
          <div>hasan</div>
          <div>01745869524</div>
        </div>
      </div>
    </div>
  );
};
export default ProfileDetails;
