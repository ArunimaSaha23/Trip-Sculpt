

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { GetPlacePhoto } from '../../services/unsplashApi';

// function PlacesToVisit({ trip }) {
//    const [placeImages, setPlaceImages] = useState({});

//    useEffect(() => {
//     const fetchPlaceImages = async () => {
//       if (trip?.tripData?.itinerary) {
//         const imagePromises = [];
  
//         Object.entries(trip.tripData.itinerary).forEach(([day, places]) => {
//           places.forEach((place, index) => {
//             imagePromises.push(
//               GetPlacePhoto(place.placeName).then(photoUrl => [`${day}-${index}`, photoUrl])
//             );
//           });
//         });
  
//         // Wait for all API calls to finish
//         const resolvedImages = await Promise.all(imagePromises);
  
//         // Convert array to object
//         const imageMap = Object.fromEntries(resolvedImages);
//         setPlaceImages(imageMap);
//       }
//     };
  
//     fetchPlaceImages();
//   }, [trip]);
  
//    return (
//      <div>
//        <h2 className="font-bold text-lg">Places to Visit</h2>
//        <div>
//          {trip?.tripData?.itinerary && typeof trip.tripData.itinerary === "object" ? (
//            Object.entries(trip.tripData.itinerary)
//              .sort(([a], [b]) => parseInt(a.replace("day", "")) - parseInt(b.replace("day", "")))
//              .map(([day, places]) => (
//                <div key={day} className="mt-4">
//                  <h2 className="font-medium text-lg underline">{day.toUpperCase()}</h2>
//                  <div className="space-y-4">
//                    {places.map((place, index) => (
//                      <Link 
//                        key={index} 
//                        to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`} 
//                        target='_blank'
//                      >
//                        <div className="hover:scale-105 cursor-pointer transition-all border rounded-lg shadow p-4">
//                          <h3 className="font-semibold text-md">{place.placeName}</h3>
//                          <p className="text-sm text-gray-600">{place.placeDetails}</p>
//                          <img
//                            src={placeImages[`${day}-${index}`] || "/placeHolder.png"}
//                            alt={place.placeName}
//                            className="w-full h-40 object-cover mt-2 rounded-lg"
//                          />
//                          <p className="text-sm text-gray-500">
//                            <strong>Ticket Price:</strong> {place.ticketPricing}
//                          </p>
//                        </div>
//                      </Link>
//                    ))}
//                  </div>
//                </div>
//              ))
//          ) : (
//            <p>No itinerary available.</p>
//          )}
//        </div>
//      </div>
//    );
// }

// export default PlacesToVisit;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetPlacePhoto } from '../../services/unsplashApi';

function PlacesToVisit({ trip }) {
   const [placeImages, setPlaceImages] = useState({});

   useEffect(() => {
    const fetchPlaceImages = async () => {
      if (trip?.tripData?.itinerary) {
        const imagePromises = [];
  
        Object.entries(trip.tripData.itinerary).forEach(([day, places]) => {
          places.forEach((place, index) => {
            imagePromises.push(
              GetPlacePhoto(place.placeName).then(photoUrl => [`${day}-${index}`, photoUrl])
            );
          });
        });
  
        const resolvedImages = await Promise.all(imagePromises);
  
        const imageMap = Object.fromEntries(resolvedImages);
        setPlaceImages(imageMap);
      }
    };
  
    fetchPlaceImages();
  }, [trip]);
  
   return (
     <div className="p-6">
       <h2 className="font-bold text-3xl mb-6 text-left">Places to Visit</h2>
       <div>
         {trip?.tripData?.itinerary && typeof trip.tripData.itinerary === "object" ? (
           Object.entries(trip.tripData.itinerary)
             .sort(([a], [b]) => parseInt(a.replace("day", "")) - parseInt(b.replace("day", "")))
             .map(([day, places]) => (
               <div key={day} className="mt-6">
                 <h2 className="font-semibold text-xl underline text-left">{day.toUpperCase()}</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                   {places.map((place, index) => (
                     <Link 
                       key={index} 
                       to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`} 
                       target='_blank'
                     >
                       <div className="hover:scale-105 cursor-pointer transition-all border rounded-lg shadow-lg p-4 bg-white text-left">
                         <h3 className="font-semibold text-lg mb-1">{place.placeName}</h3>
                         <p className="text-sm text-gray-700 mb-2">{place.placeDetails}</p>
                         <img
                           src={placeImages[`${day}-${index}`] || "/placeHolder.png"}
                           alt={place.placeName}
                           className="w-full h-40 object-cover mt-2 rounded-lg"
                         />
                         <p className="text-sm text-gray-600 mt-2">
                           <strong>Ticket Price:</strong> {place.ticketPricing}
                         </p>
                       </div>
                     </Link>
                   ))}
                 </div>
               </div>
             ))
         ) : (
           <p className="text-left text-gray-600">No itinerary available.</p>
         )}
       </div>
     </div>
   );
}

export default PlacesToVisit;
