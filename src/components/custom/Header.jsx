// import React, { useEffect } from 'react';
// import { Button } from '../ui/button';
// import { auth, provider, signInWithPopup, signOut } from '../../firebase/firebaseConfig';
// import { FaUserCircle } from 'react-icons/fa';

// function Header({ user, setUser }) {
//   const user = JSON.parse(localStorage.getItem('user'));
//   useEffect(()=>{
//     console.log(user);
//   },[])
//   // Handle Google sign-in
//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       setUser(result.user);
//     } catch (error) {
//       console.error("Google sign-in failed:", error);
//     }
//   };

//   // Handle Google sign-out
//   const handleGoogleSignOut = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//     } catch (error) {
//       console.error("Google sign-out failed:", error);
//     }
//   };

//   return (
//     <div className="w-full fixed top-0 left-0 bg-white shadow-md flex justify-between items-center px-5 py-3">
//       {/* Logo */}
//       <div className="flex items-center gap-2">
//         <img src="/car.png" alt="Logo" className="h-12 w-auto object-contain" />
//         <h1 className="text-3xl font-bold">
//           <span className="text-[#FFA686]">Trip</span>
//           <span className="text-gray-800">Sculpt</span>
//         </h1>
//       </div>

//       {/* User Section */}
//       <div className="flex items-center gap-4">
//         {user ? (
//           <div className="flex items-center gap-2">
//             <FaUserCircle className="text-gray-700 text-2xl" />
//             <p className="text-gray-700 font-medium">{user.displayName}</p>
//             <Button 
//               onClick={handleGoogleSignOut} 
//               className="px-6 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white"
//             >
//               Logout
//             </Button>
//           </div>
//         ) : (
//           <Button onClick={handleGoogleSignIn} className="px-6 py-2 text-sm font-medium">
//             Sign in
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Header;
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
//import { auth, provider, signInWithPopup, signOut } from '../../firebase/firebaseConfig';
//import { FaUserCircle } from 'react-icons/fa';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { auth, provider } from '../../firebase/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';



function Header() {
  // Remove the duplicate user declaration from localStorage
  
  // Handle Google sign-in
  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     setUser(result.user);
  //     // Store user in localStorage
  //     localStorage.setItem('user', JSON.stringify(result.user));
  //   } catch (error) {
  //     console.error("Google sign-in failed:", error);
  //   }
  // };

  // // Handle Google sign-out
  // const handleGoogleSignOut = async () => {
  //   try {
  //     await signOut(auth);
  //     setUser(null);
  //     // Clear user from localStorage
  //     localStorage.removeItem('user');
  //   } catch (error) {
  //     console.error("Google sign-out failed:", error);
  //   }
  // };
  //const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  useEffect(()=>{
    console.log(user);
  },[])
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
  
      // Close dialog & update UI
      setUser(user);
      setOpenDialog(false);
    } catch (error) {
      console.error("Google sign-in failed:", error.message);
    }
  };
  const handleGoogleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      setUser(null); // Update the state without reloading
    } catch (error) {
      console.error("Google sign-out failed:", error);
    }
  };
  
  return (
    <div 
  className="w-full fixed top-0 left-0 shadow-md flex justify-between items-center px-5 py-3 bg-white"
>


      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/car.png" alt="Logo" className="h-12 w-auto object-contain" />
        <h1 className="text-3xl font-bold">
          <span className="text-[#FFA686]">Trip</span>
          <span className="text-gray-800">Sculpt</span>
        </h1>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
          {user?
            <div className='flex items-center gap-3'>
              <a href="/create-trip">
              <Button variant="outline" className="rounded-full">+ Create Trip</Button>
              </a>
              <a href="/my-trips">
              <Button variant="outline" className="rounded-full">My Trips</Button>
              </a>
              <Popover>
                <PopoverTrigger className="bg-transparent"><p>{user.displayName}</p></PopoverTrigger>
                <PopoverContent><h2 className='cursor-pointer' onClick={()=>{
                  handleGoogleSignOut();
                  localStorage.clear();
                  window.location.reload();
                  }}>Logout</h2>
                  </PopoverContent>
              </Popover>
            </div>
            :
            <Button onClick={()=>setOpenDialog(true)} className="px-6 py-2 text-sm font-medium">
              Sign in
            </Button>
          }
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
}

export default Header;