import { Link } from "react-router-dom";

const LinkContainer = ({ link }) => {
  // Ensure the link has http/https prefix
  const formattedLink = link.startsWith('http://') || link.startsWith('https://') 
    ? link 
    : `http://${link}`;

  return (
    <div className="flex flex-row p-2 items-center">
      <div className="font-bold mr-2">Site Link:</div>
      <div>
        <a 
          href={formattedLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline break-all"
        >
          {link} {/* Show original link text */}
        </a>
      </div>
    </div>
  );
};

export default LinkContainer;