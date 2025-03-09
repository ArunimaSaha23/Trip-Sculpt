// services/unsplashApi.js
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'import.meta.env.VITE_UNSPLASH_ACCESS_KEY';

// export const GetPlacePhoto = async (location) => {
//     try {
//       const response = await axios.get('https://api.unsplash.com/search/photos', {
//         params: {
//           query: `${location} landmark tourism`, // Full location name
//           per_page: 1,
//           orientation: 'landscape'
//         },
//         headers: {
//           'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
//         }
//       });
  
//       return response.data.results[0]?.urls?.regular || '/placeholder.png';
//     } catch (error) {
//       console.error('Error fetching place photo:', error);
//       return '/placeholder.png';
//     }
//   };
export const GetPlacePhoto = async (location) => {
    console.log('Searching photo for:', location); // Log the location being searched
    
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: location, // Try with just location name first
          per_page: 1,
          orientation: 'landscape'
        },
        headers: {
          'Authorization': `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
        }
      });
  
      console.log('Unsplash API Response:', response.data); // Log full API response
  
      const photoUrl = response.data.results[0]?.urls?.regular;
      console.log('Photo URL:', photoUrl); // Log the photo URL
  
      return photoUrl || '/placeholder.png';
    } catch (error) {
      console.error('Error fetching place photo:', error);
      return '/placeholder.png';
    }
  };
