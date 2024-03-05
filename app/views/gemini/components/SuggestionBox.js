import SkeletonLoader from "./SkeletonLoader";
import Suggesttions from "./Suggestions";

const SuggestionBox = ({ suggestedResponses, handleSuggestionClick ,isLoading}) => {
 
  return (
    <div className="mt-2 flex flex-wrap justify-start items-center gap-2 p-2">
      {isLoading ? (
        <SkeletonLoader count={3} />
      ) : (
        <Suggesttions
          suggestedResponses={suggestedResponses}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};
export default SuggestionBox;
