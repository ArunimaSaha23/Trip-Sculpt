
// import React, { useEffect, useState } from 'react'
// import { Button } from '../../components/ui/button'
// import { FaPaperPlane } from "react-icons/fa"
// import { GetPlacePhoto } from '../../services/unsplashApi'

// function InfoSection({ trip }) {
//    const [placePhoto, setPlacePhoto] = useState('/placeHolder.png')

//    useEffect(() => {
//     const fetchPlacePhoto = async () => {
//       // Use destination from userSelection directly
//       if (trip?.userSelection?.destination) {
//         const photoUrl = await GetPlacePhoto(trip?.userSelection?.destination)
//         if (photoUrl) setPlacePhoto(photoUrl)
//       }
//     }
//     fetchPlacePhoto()
//   }, [trip])

//    return (
//      <div className='flex justify-between items-center'>
//        <div>
//          <img 
//            src={placePhoto} 
//            alt={trip?.userSelection?.destination} 
//            className='h-[340px] w-full object-cover rounded-xl' 
//          />
//          <div className='my-5 flex flex-col gap-2'>
//            <h2 className='font-bold text-2xl text-left'>
//              {trip?.userSelection?.destination}
//              <div className='flex gap-5'>
//                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
//                  🗓️ {trip?.userSelection?.noOfDays}
//                </h2>
//                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
//                  💰 {trip?.userSelection?.budget}
//                </h2>
//                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
//                  🥂 No. of Travellers: {trip?.userSelection?.traveler}
//                </h2>
//              </div>
//            </h2>
//          </div>
//        </div>
//        <Button><FaPaperPlane /></Button>
//      </div>
//    )
// }

// export default InfoSection
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { FaPaperPlane } from "react-icons/fa"
import { GetPlacePhoto } from '../../services/unsplashApi'

function InfoSection({ trip }) {
   const [placePhoto, setPlacePhoto] = useState('/placeHolder.png')

   useEffect(() => {
    const fetchPlacePhoto = async () => {
      if (trip?.userSelection?.destination) {
        const photoUrl = await GetPlacePhoto(trip?.userSelection?.destination)
        if (photoUrl) setPlacePhoto(photoUrl)
      }
    }
    fetchPlacePhoto()
  }, [trip])

   return (
     <div className='flex flex-col md:flex-row justify-between items-center mt-10 gap-8'>
       <div className='w-full md:w-2/3'>
         <img 
           src={placePhoto} 
           alt={trip?.userSelection?.destination} 
           className='h-[420px] w-full object-cover rounded-xl shadow-lg' 
         />
         <div className='my-8 flex flex-col gap-4'>
           <h2 className='font-bold text-3xl text-left'>
             {trip?.userSelection?.destination}
           </h2>
           <div className='flex gap-5 flex-wrap'>
             <h2 className='p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-sm md:text-lg'>
               🗓️ {trip?.userSelection?.noOfDays} Days
             </h2>
             <h2 className='p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-sm md:text-lg'>
               💰 Budget: {trip?.userSelection?.budget}
             </h2>
             <h2 className='p-2 px-4 bg-gray-200 rounded-full text-gray-600 text-sm md:text-lg'>
               🥂 Travelers: {trip?.userSelection?.traveler}
             </h2>
           </div>
         </div>
       </div>
     </div>
   )
}

export default InfoSection

