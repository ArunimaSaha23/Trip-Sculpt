
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SelectBudgetOptions, SelectTravelList } from '../constants/options';
import { Button } from '@/components/ui/button';

const CreateTrip = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    noOfDays: '',
    budget: '',
    traveler: ''
  });

  // Handle form input changes and update state
  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value || ''  // Ensure empty values are set
    }));
  };

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  // Function to generate trip with validation
  const onGenerateTrip = () => {
    if (!formData.destination || !formData.noOfDays || formData.noOfDays > 5 || !formData.budget || !formData.traveler) {
      console.warn("Please fill in all fields correctly.");
      return;
    }
    console.log("Generated Trip Data:", formData);
  };

  // Handle search input and fetch autocomplete suggestions
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    handleInputChange('destination', value);

    if (value.length > 2) {
      setLoading(true);
      try {
        const response = await axios.get('https://us1.locationiq.com/v1/search.php', {
          params: {
            key: 'pk.63b5829446e2bc1f4c3bbc0153f326c7',  
            q: value,                                  
            format: 'json',
            addressdetails: 1,
            limit: 5,                                  
          },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching autocomplete data:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle selection of a suggestion
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.display_name);
    handleInputChange('destination', suggestion.display_name);
    setSuggestions([]);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-20 text-left">
      <h2 className="font-bold text-3xl">Tell us your preferences 🏕️🏖️⛰️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20">
        <h2 className="text-xl my-3 font-medium">Ready to explore? Tell us your destination! 🌴🗺️</h2>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          className="p-2 border rounded w-full bg-white text-black"
          placeholder="Type a place"
        />
        {loading && <p>Loading...</p>}
        {suggestions.length > 0 && (
          <ul className="mt-2 border rounded bg-white shadow-md">
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-20">
        <h2 className="text-xl my-3 font-medium">What’s the duration of your trip? 🗓️⌛</h2>
        <input
          type="number"
          value={formData.noOfDays}
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          className="p-2 border rounded w-full bg-white text-black"
          placeholder="Ex. 3"
        />
      </div>

      <div className="mt-20">
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                ${formData.budget === item.title ? 'shadow-lg border-black' : ''}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-xl my-3 font-medium">Who do you plan to travel with?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                ${formData.traveler === item.people ? 'shadow-lg border-black' : ''}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
};

export default CreateTrip;
