import React from "react";

const SkeletonLoader = ({ count }) => {
  return (
    <>
      {Array(count)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className="animate-pulse text-sm font-medium py-2 px-4 bg-gray-300 rounded-md w-24"
          ></div>
        ))}
    </>
  );
};

export default SkeletonLoader;
