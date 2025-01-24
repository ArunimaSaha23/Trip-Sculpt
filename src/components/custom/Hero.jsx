import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto gap-9 text-center mt-20 px-5">
      <h1 className="font-extrabold text-[50px] leading-tight">
        <span className="text-[#FFA686]">Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
      <Button className="px-8 py-3 text-lg font-medium">Get Started, It's Free</Button>
      </Link>
      
    </div>
  );
}

export default Hero;
