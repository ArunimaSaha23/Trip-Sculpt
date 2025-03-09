const BASE_URL = 'https://us1.locationiq.com/v1/search.php';
import axios from 'axios';

const API_KEY = import.meta.env.REACT_APP_LOCATIONIQ_API_KEY; // Use correct env variable

export const GetPlaceDetails = async (query) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query, // User-inputted place name
                format: 'json'
            }
        });

        return response.data; // Array of place results
    } catch (error) {
        console.error("Error fetching place details:", error);
        return null;
    }
};
