const TagContainer = () => {
    return (
      <div className="flex flex-row flex-wrap gap-2 mt-2 mb-2">
        {/* Primary Badge */}
        <div className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm font-medium">
          #Primary
        </div>
  
        {/* Secondary Badge */}
        <div className="px-3 py-1 rounded-full bg-gray-500 text-white text-sm font-medium">
          #Secondary
        </div>
  
        {/* Accent Badge */}
        <div className="px-3 py-1 rounded-full bg-purple-500 text-white text-sm font-medium">
          #Accent
        </div>
  
        {/* Neutral Badge */}
        <div className="px-3 py-1 rounded-full bg-gray-300 text-gray-800 text-sm font-medium">
          #Neutral
        </div>
  
        {/* Info Badge */}
        <div className="px-3 py-1 rounded-full bg-cyan-500 text-white text-sm font-medium">
          #Info
        </div>
  
        {/* Success Badge */}
        <div className="px-3 py-1 rounded-full bg-green-500 text-white text-sm font-medium">
          #Success
        </div>
  
        {/* Warning Badge */}
        <div className="px-3 py-1 rounded-full bg-yellow-500 text-yellow-900 text-sm font-medium">
          #Warning
        </div>
  
        {/* Error Badge */}
        <div className="px-3 py-1 rounded-full bg-red-500 text-white text-sm font-medium">
          #Error
        </div>
      </div>
    );
  };
  
  export default TagContainer;
