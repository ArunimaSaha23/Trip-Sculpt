import React, { useEffect, useState } from 'react'
import { GetPlacePhoto } from '../../services/unsplashApi'
import { Link } from 'react-router-dom'

const UserTripCardItem = ({trip}) => {
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
      <img src={placePhoto?placePhoto:'/placeHolder.png'} 
           alt={trip?.userSelection?.destination}  className='object-cover rounded-xl h-[250px]'/>
      <div>
        <h2 className='font-bold text-lg'>
            {trip?.userSelection?.destination}
        </h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget ({trip?.userSelection?.traveler})</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem
