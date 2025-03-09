// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { StrictMode } from 'react';
// import './index.css';
// import App from './App.jsx';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import CreateTrip from './create-trip';


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: '/create-trip',
//     element: <CreateTrip />,  // Use the correct component name
//   }
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>,
// );
// import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateTrip from './create-trip';
import Header from './components/custom/Header.jsx';
import Viewtrip from './view-trip/[tripId]/index.jsx';
import MyTrips from './my-trips/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <App />
      </>
    ),
  },
  {
    path: '/create-trip',
    element: (
      <>
        <Header />
        <CreateTrip />
      </>
    ),
  },
  {
    path:'/view-trip/:tripId',
    element:(
      <>
      <Header/>
      <Viewtrip/>
      </>
  )
  },
  {
    path:'/my-trips',
    element:(
      <>
      <Header/>
      <MyTrips/>
      </>
  )
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
