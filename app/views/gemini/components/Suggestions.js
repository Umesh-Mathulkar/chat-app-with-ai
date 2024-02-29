const Suggesttions = ({suggestedResponses,handleSuggestionClick})=>{

    return(
        suggestedResponses &&
              suggestedResponses.map((suggestion, index) => (
                <button
                  key={index}
                  className="text-sm font-medium py-2 px-4 bg-white text-gray-800  hover:bg-gray-100 rounded-md border border-gray-300 transition ease-in-out duration-150"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))
    )
}

export default Suggesttions;