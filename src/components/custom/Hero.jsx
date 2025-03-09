import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div>
      <h1 className="font-extrabold text-[50px] leading-tight text-[#FFA686]">
        Discover Your Next Adventure with AI:
      </h1>
      <h2 className="text-4xl font-bold text-black">
        Personalized Itineraries at Your Fingertips
      </h2>
      <p className="text-xl text-gray-700 max-w-xl mx-auto mt-2">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button className="px-8 py-3 text-lg font-medium mt-5 bg-black text-white">Get Started, It's Free</Button>
      </Link>
    </div>
  );
}

export default Hero;
