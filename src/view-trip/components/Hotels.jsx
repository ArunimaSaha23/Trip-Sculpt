// import React from 'react'
// import { Link } from 'react-router-dom'

// function Hotels({trip}) {
//   return (
//     <div>
//   <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
//   <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
//     {trip?.tripData?.hotels?.map((hotel, index) => (
//         <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+","+hotel?.hotelAddress} target='_blank'>
//       <div key={index} className=" hover:scale-105 cursor-pointer transition-all border rounded-lg shadow p-4">
//         <img
//           src={hotel?.image || "/placeHolder.png"} // Replace with a fallback image if `item.image` is undefined
//           alt={hotel?.name || "Hotel"}
//           className="w-full h-40 object-cover rounded-md"
//         />
//         <div className='my-2 flex flex-col gap-2'>
//             <h2 className='font-medium'>
//                 {hotel?.hotelName}
//             </h2>
//             <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
//             <h2 className='text-sm'>💲 {hotel?.price}</h2>
//             <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
//         </div>
//       </div>
//       </Link>
//     ))}
//   </div>
// </div>
//   )
// }

// export default Hotels
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetPlacePhoto } from '../../services/unsplashApi'

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({});

  useEffect(() => {
    const fetchHotelImages = async () => {
      if (trip?.tripData?.hotels) {
        const imagePromises = trip.tripData.hotels.map(async (hotel) => {
          const photoUrl = await GetPlacePhoto(hotel.hotelName);
          return [hotel.hotelName, photoUrl]; // Using hotelName as the key
        });

        const resolvedImages = await Promise.all(imagePromises);
        const imageMap = Object.fromEntries(resolvedImages);
        setHotelImages(imageMap);
      }
    };

    fetchHotelImages();
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-3xl mt-7 text-left">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-11">
        {trip?.tripData?.hotels?.map((hotel) => (
          <Link 
            key={hotel.hotelName} // Use hotelName as the unique key
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel?.hotelAddress}`} 
            target='_blank'
          >
            <div className="hover:scale-105 cursor-pointer transition-all border rounded-lg shadow p-4">
              <img
                src={hotelImages[hotel.hotelName] || "/placeHolder.png"} // Use hotelName for the image lookup
                alt={hotel?.hotelName || "Hotel"}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                <h2 className='text-sm'>💲 {hotel?.price}</h2>
                <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotels;
