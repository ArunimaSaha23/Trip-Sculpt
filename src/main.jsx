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
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateTrip from './create-trip';;
import Header from './components/custom/Header';

// Define a layout component to include the header on all pages
const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: '/create-trip',
    element: (
      <Layout>
        <CreateTrip />
      </Layout>
    ),
  }
]);

// Render the app with routing
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Toaster /> */}
    <RouterProvider router={router} />
  </StrictMode>
);

