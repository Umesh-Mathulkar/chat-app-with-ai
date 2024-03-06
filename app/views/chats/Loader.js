import React from "react";
import Spinner from "./spinner"; // Import the Spinner component


const Loader = ({ isLoading, children }) => {
  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          {/* Apply gradient background to the entire Loader component */}
          <div className="gradient-bg"></div>
          <div className="spinner-wrapper">
            <Spinner />
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Loader;
