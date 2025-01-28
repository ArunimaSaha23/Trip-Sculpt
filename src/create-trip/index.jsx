
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Input } from "@/components/ui/input";
// import { Button } from '@/components/ui/button';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '../constants/options';
// import { chatSession } from '../services/AIModel';
// import { auth, db, provider, signInWithPopup } from '../firebase/firebaseConfig';
// import { doc, setDoc } from 'firebase/firestore';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogClose,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { FcGoogle } from "react-icons/fc";






// const CreateTrip = () => {
//   const [user, setUser] = useState(null);
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [openDialog,setOpenDialog]=useState(false);
//   const [formData, setFormData] = useState({
//     destination: '',
//     noOfDays: '',
//     budget: '',
//     traveler: '',
//   });

//   // Handle form input changes and update state
//   const handleInputChange = (name, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value || '', // Ensure empty values are set
//     }));
//   };

//   // Check for form updates in the console
//   useEffect(() => {
//     console.log("Form Data Updated:", formData);
//   }, [formData]);

//   // Google Sign-in handler
//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       setUser(result.user);
//       console.log("Signed in as:", result.user.displayName);
//     } catch (error) {
//       console.error("Error signing in:", error.message);
//     }
//   };
//   const SaveAITrip=async(TripData)=>{
//     const docId=Date.now().toString()
//     await setDoc(doc(db,"AITrips",docId),{
//       userSelection:formData,
//       tripData:JSON.parse(TripData),
//       //userEmail:user?.email,
//       id:docId
//     });
//   }
//   // Function to generate trip with validation and login check
//   const onGenerateTrip = async () => {
//     const user = localStorage.getItem('user');
//     if (!user) {
//       setOpenDialog(true);
//       //alert("Please sign in with Google before generating a trip.");
//       //handleGoogleSignIn();
//       return;
//     }

//     if (!formData.destination || !formData.noOfDays || formData.noOfDays > 5 || !formData.budget || !formData.traveler) {
//       console.warn("Please fill in all fields correctly.");
//       return;
//     }

//     const FINAL_PROMPT = AI_PROMPT
//       .replace('{location}', formData?.destination)
//       .replace('{totalDays}', formData?.noOfDays)
//       .replace('{traveler}', formData?.traveler)
//       .replace('{budget}', formData?.budget)
//       .replace('{totalDays}', formData?.noOfDays);

//     console.log(FINAL_PROMPT);

//     const result = await chatSession.sendMessage(FINAL_PROMPT);
//     console.log("--",result?.response.text());
//     SaveAITrip(result?.response.text());
//   };

  

//   // Handle search input and fetch autocomplete suggestions
//   const handleSearch = async (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     handleInputChange('destination', value);

//     if (value.length > 2) {
//       setLoading(true);
//       try {
//         const response = await axios.get('https://us1.locationiq.com/v1/search.php', {
//           params: {
//             key: 'pk.63b5829446e2bc1f4c3bbc0153f326c7',
//             q: value,
//             format: 'json',
//             addressdetails: 1,
//             limit: 5,
//           },
//         });
//         setSuggestions(response.data);
//       } catch (error) {
//         console.error('Error fetching autocomplete data:', error);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   // Handle selection of a suggestion
//   const handleSuggestionClick = (suggestion) => {
//     setQuery(suggestion.display_name);
//     handleInputChange('destination', suggestion.display_name);
//     setSuggestions([]);
//   };

//   return (
//     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-20 text-left">
//       <h2 className="font-bold text-3xl">Tell us your preferences 🏕️🏖️⛰️</h2>
//       <p className="mt-3 text-gray-500 text-xl">
//         Just provide some basic information and our trip planner will generate a customized itinerary based on your preferences.
//       </p>

//       <div className="mt-20">
//         <h2 className="text-xl my-3 font-medium">Ready to explore? Tell us your destination! 🌴🗺️</h2>
//         <input
//           type="text"
//           value={query}
//           onChange={handleSearch}
//           className="p-2 border rounded w-full bg-white text-black"
//           placeholder="Type a place"
//         />
//         {loading && <p>Loading...</p>}
//         {suggestions.length > 0 && (
//           <ul className="mt-2 border rounded bg-white shadow-md">
//             {suggestions.map((item, index) => (
//               <li
//                 key={index}
//                 onClick={() => handleSuggestionClick(item)}
//                 className="p-2 cursor-pointer hover:bg-gray-100"
//               >
//                 {item.display_name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="mt-20">
//         <h2 className="text-xl my-3 font-medium">What’s the duration of your trip? 🗓️⌛</h2>
//         <input
//           type="number"
//           value={formData.noOfDays}
//           onChange={(e) => handleInputChange('noOfDays', e.target.value)}
//           className="p-2 border rounded w-full bg-white text-black"
//           placeholder="Ex. 3"
//         />
//       </div>

//       <div className="mt-20">
//         <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
//         <div className="grid grid-cols-3 gap-5 mt-5">
//           {SelectBudgetOptions.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => handleInputChange('budget', item.title)}
//               className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
//                 ${formData.budget === item.title ? 'shadow-lg border-black' : ''}`}
//             >
//               <h2 className="text-4xl">{item.icon}</h2>
//               <h2 className="font-bold text-lg">{item.title}</h2>
//               <h2 className="text-sm text-gray-500">{item.desc}</h2>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-20">
//         <h2 className="text-xl my-3 font-medium">Who do you plan to travel with?</h2>
//         <div className="grid grid-cols-3 gap-5 mt-5">
//           {SelectTravelList.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => handleInputChange('traveler', item.people)}
//               className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
//                 ${formData.traveler === item.people ? 'shadow-lg border-black' : ''}`}
//             >
//               <h2 className="text-4xl">{item.icon}</h2>
//               <h2 className="font-bold text-lg">{item.title}</h2>
//               <h2 className="text-sm text-gray-500">{item.desc}</h2>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="my-10 flex justify-end">
//         <Button onClick={onGenerateTrip}>Generate Trip</Button>
//       </div>
//       <Dialog open={openDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogDescription>
//               <div className="flex items-center gap-2">
//                 <img src="/car.png" alt="Logo" className="h-9 w-auto object-contain" />
//                 <h1 className="text-3xl font-bold">
//                   <span className="text-[#FFA686]">Trip</span>
//                   <span className="text-gray-800">Sculpt</span>
//                 </h1>
//               </div>
//               <h2 className='font-bold text-lg mt-4'>Sign In With Google</h2>
//               <p>Sign in to the App securely with Google Authentication</p>
//               <Button onClick={handleGoogleSignIn}
//               className="w-full mt-6 flex gap-4 items-center">
//                 <FcGoogle className='h-7 w-7' />
//                 Sign In With Google</Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>

//     </div>
//   );
// };

// export default CreateTrip;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '../constants/options';
import { chatSession } from '../services/AIModel';
import { auth, db, provider, signInWithPopup } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Custom hook for Firebase authentication
const useGoogleLogin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        uid: result.user.uid
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  return { user, loading, login };
};


const CreateTrip = () => {
  const { user, loading, login } = useGoogleLogin();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingTripGeneration, setPendingTripGeneration] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    noOfDays: '',
    budget: '',
    traveler: '',
  });
  const [loadingg,setLoading]=useState(false);
  useEffect(() => {
    if (user && pendingTripGeneration) {
      onGenerateTrip();
      setPendingTripGeneration(false);
    }
  }, [user, pendingTripGeneration]);

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value || '',
    }));
  };


  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  const handleGoogleSignIn = async () => {
    try {
      await login();
      setOpenDialog(false);
      setPendingTripGeneration(true);
    } catch (error) {
      console.error("Error signing in:", error.message);
      setPendingTripGeneration(false);
    }
  };


  const SaveAITrip = async (TripData) => {
    if (!user) return;
    setLoading(true);
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      userId: user?.uid,
      id: docId,
      createdAt: new Date().toISOString()
    });
    setLoading(false)
  };
  const onGenerateTrip = async () => {
  
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData.destination || !formData.noOfDays || formData.noOfDays > 5 || !formData.budget || !formData.traveler) {
      console.warn("Please fill in all fields correctly.");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.destination)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response.text());
    setLoading(false);
    SaveAITrip(result?.response.text());
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    handleInputChange('destination', value);

    if (value.length > 2) {
      setSearchLoading(true);
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
        setSearchLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

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
        {searchLoading && <p>Loading...</p>}
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
        <h2 className="text-xl my-3 font-medium">What's the duration of your trip? 🗓️⌛</h2>
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
        <Button disabled={loadingg} onClick={onGenerateTrip}>
        {loadingg?
                <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>:'Generate Trip'}</Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex items-center gap-2">
                <img src="/car.png" alt="Logo" className="h-9 w-auto object-contain" />
                <h1 className="text-3xl font-bold">
                  <span className="text-[#FFA686]">Trip</span>
                  <span className="text-gray-800">Sculpt</span>
                </h1>
              </div>
              <h2 className='font-bold text-lg mt-4'>Sign In With Google</h2>
              <p>Sign in to the App securely with Google Authentication</p>
              <Button 
                onClick={handleGoogleSignIn}
                className="w-full mt-6 flex gap-4 items-center"
              >
                <FcGoogle className='h-7 w-7' />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;