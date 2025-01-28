import React from 'react';
import { Button } from '../ui/button';
import { auth, provider, signInWithPopup, signOut } from '../../firebase/firebaseConfig';
import { FaUserCircle } from 'react-icons/fa';

function Header({ user, setUser }) {
  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  // Handle Google sign-out
  const handleGoogleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Google sign-out failed:", error);
    }
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-white shadow-md flex justify-between items-center px-5 py-3">
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
        {user ? (
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-gray-700 text-2xl" />
            <p className="text-gray-700 font-medium">{user.displayName}</p>
            <Button 
              onClick={handleGoogleSignOut} 
              className="px-6 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button onClick={handleGoogleSignIn} className="px-6 py-2 text-sm font-medium">
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
