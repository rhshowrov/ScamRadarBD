import { Link } from "react-router-dom";
import ImageContainer from "./ImageContainer";
import TagContainer from "./TagContainer";

const PostCard = () => {
  return (
    <div className="grid grid-row-5 rounded bg-[#010914] p-2 mt-2 border mb-2">
      <div className="grid grid-cols-6 md:grid-cols-8 mb-3">
        <div className="col-span-1">
          <img
            className="rounded-full h-15 w-15 "
            src="/profile.png"
            alt="profile"
          />
        </div>
        <div className="col-span-5 md:col-span-7 flex flex-col ">
          <div className="font-bold">Rakibul Hasan</div>
          <div className="font-thin mb-3">06 Feb 2025 10:25 PM</div>
          <div className="p-2 w-1/3 rounded bg-purple-500  text-white text-sm font-medium">
         Type: Online Scam
        </div>
        </div>
        
      </div>
      <hr />

      <div className="mt-2 mb-2"> 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ex veritatis reprehenderit fugiat ipsam quas cum provident, culpa dicta ipsa minus ratione neque odio nostrum, velit, impedit unde itaque ad!
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti quam natus tempora assumenda, tenetur itaque, eaque impedit quos earum cupiditate sint eos nobis dicta inventore, obcaecati corporis. Iste, illo nostrum!
        <Link > See Details....</Link>
        </div>
      <ImageContainer />
      <TagContainer />
      <div>5</div>
    </div>
  );
};
export default PostCard;
