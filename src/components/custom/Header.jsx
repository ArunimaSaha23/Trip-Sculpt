import React from 'react';
import { Button } from '../ui/button';

function Header() {
  return (
    <div className="w-full fixed top-0 left-0 bg-white shadow-md flex justify-between items-center px-5 py-3">
      <div className="flex items-center gap-2">
        <img 
          src="/car.png" 
          alt="Logo" 
          className="h-12 w-auto object-contain" 
        />
        <h1 className="text-3xl font-bold">
          <span className="text-[#FFA686]">Trip</span>
          <span className="text-gray-800">Sculpt</span>
        </h1>
      </div>
      <div>
        <Button className="px-6 py-2 text-sm font-medium">Sign in</Button>
      </div>
    </div>
  );
}

export default Header;

