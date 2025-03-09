// import { useState } from 'react'
// import './App.css'
// import { Button } from './components/ui/button'
// import Header from "./components/custom/Header";
// import Hero from "./components/custom/Hero";



// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <Header/>
//       <Hero/>
//     </>
//   )
// }

// export default App
// import { useState, useEffect } from 'react';
// import './App.css';
// import Header from "./components/custom/Header";
// import Hero from "./components/custom/Hero";
// import { auth } from './firebase/firebaseConfig';

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <>
//       <Header user={user} setUser={setUser} />
//       <Hero user={user} setUser={setUser} />
//     </>
//   );
// }

// export default App;
import { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/custom/Header";
import Hero from "./components/custom/Hero";
import { auth } from './firebase/firebaseConfig';

function App() {
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Hero user={user} setUser={setUser} />
    </>
  );
}

export default App;