// import React, { useState } from 'react';
// import axios from 'axios';

// const AutocompleteInput = ({ label, value, setValue }) => {


//     const api_key = "rc6M42Nm9j98C08qT53xlBUhKMAMMGrMpoqsytwU";

//     const [isOpen, setIsOpen] = useState(true);

//     const {
//         ready,
//         value: inputValue,
//         suggestions: { status, data },
//         setValue: setAutoCompleteValue,
//         clearSuggestions,
//       } = usePlacesAutocomplete({
//         requestOptions: {
//           /* Define search bounds here */
//         },
//         debounce: 300,
//       });


//   const [suggestions, setSuggestions] = useState([]);

//   const handleChange = async (e) => {
//     const input = e.target.value;
//     setValue(input);
    
//     if (input.length > 2) {
//       try {
//         const response = await axios.get("https://api.olamaps.io/places/v1/autocomplete", // Replace with your Ola Maps API endpoint
//           {
//             params: {
//               input: input,
//               api_key, // Replace with your actual API key
//             },
//           }
//         );
//         setSuggestions(response.data.predictions); // Update suggestions with the predictions
//         setIsOpen(true);
//       } catch (error) {
//         console.error("Error fetching suggestions:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <label>{label}</label>
//       <input type="text" value={value} onChange={handleChange} />
//       <ul>
//         {suggestions.map((suggestion) => (
//           <li key={suggestion.reference} onClick={() => setValue(suggestion.description)}>
//             {suggestion.description}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AutocompleteInput;




// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';

// const AutocompleteInput = ({ label, value, setValue }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [suggestions, setSuggestions] = useState([]);
  

//   const API_KEY = "rc6M42Nm9j98C08qT53xlBUhKMAMMGrMpoqsytwU"; // Replace with your Ola Maps API Key

//   const handleInput = async (e) => {
//     const inputValue = e.target.value;
//     setValue(inputValue);

//     if (inputValue.length > 2) {
//       try {
//         const response = await axios.get("https://api.olamaps.io/places/v1/autocomplete", {
//           params: {
//             input: inputValue,
//             api_key: API_KEY,
//           },
//         });

//         setSuggestions(response.data.predictions);
//         setIsOpen(true); // Open suggestion box when typing
//       } catch (error) {
//         console.error('Error fetching location suggestions:', error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSelect = async (description, place_id) => {
//     setValue(description);
//     setIsOpen(false); // Close suggestion box
//     setSuggestions([]);

    
//   };

 

//   return (
//     <div className="flex flex-col m-2 relative">
//       <label className='text-text text-lg font-medium text-contrast-darkBlue'>{label}</label>
//       <input
//       className="p-1 rounded w-80"
//         value={value}
//         onChange={handleInput}
//         placeholder="Search for a location"
//       />
//       {/* Render suggestions if input box is focused and there are suggestions */}
//       {isOpen && suggestions.length > 0 && (
//         <ul className='absolute top-14 bg-white z-10 border-t-2 border-black'>
//           {suggestions.map(({ description, place_id }) => (
//             <li
//             className='max-w-[30vw] max-h-8 cursor-pointer overflow-hidden border-t-0 border-2 border-black'
//             key={place_id} onClick={() => handleSelect(description, place_id)}>
//               {description}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AutocompleteInput;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const AutocompleteInput = ({ label, value, setValue }) => {
  const [isOpen, setIsOpen] = useState(false); // Set initial state to false
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null); // Reference for suggestions box

  const API_KEY = "rc6M42Nm9j98C08qT53xlBUhKMAMMGrMpoqsytwU"; // Replace with your Ola Maps API Key

  const handleInput = async (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue.length > 2) {
      try {
        const response = await axios.get("https://api.olamaps.io/places/v1/autocomplete", {
          params: {
            input: inputValue,
            api_key: API_KEY,
          },
        });

        setSuggestions(response.data.predictions);
        setIsOpen(true); // Open suggestion box when typing
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setIsOpen(false); // Close suggestions if input is too short
    }
  };

  const handleSelect = async (description, place_id) => {
    setValue(description);
    setIsOpen(false); // Close suggestion box
    setSuggestions([]);
  };

  // Handle clicks outside of the suggestions box to close it
  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Attach event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col m-2 relative" ref={suggestionsRef}>
      <label className='text-text text-lg font-medium text-contrast-darkBlue'>{label}</label>
      <input
        className="p-1 rounded w-80"
        value={value}
        onChange={handleInput}
        placeholder="Search for a location"
        onFocus={() => setIsOpen(true)} // Open suggestions when input is focused
      />
      {/* Render suggestions if input box is focused and there are suggestions */}
      {isOpen && suggestions.length > 0 && (
        <ul className='absolute top-14 bg-white z-10 border-t-2 border-black'>
          {suggestions.map(({ description, place_id }) => (
            <li
              className='max-w-[30vw] max-h-8 cursor-pointer overflow-hidden border-t-0 border-2 border-black'
              key={place_id}
              onClick={() => handleSelect(description, place_id)}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
