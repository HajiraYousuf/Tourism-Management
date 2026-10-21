import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Destinations from './pages/Destinations.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Tours from './pages/Tours.jsx'
import TourDetail from './pages/TourDetail.jsx'
import Booking from './pages/Booking.jsx'
import MyBookings from './pages/MyBookings.jsx'
import DestinationDetails from './pages/DestinationDetails.jsx'
import Payment from './pages/payment.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'



const routerProvider = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"/destinations",
        element:<Destinations/>
      },
      { path: "/destination/:id", 
        element: <DestinationDetails /> 
      },

      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      { 
        path:"/tours",
        element:<Tours/>
      },
      { path: "/tours/:id", 
        element: <TourDetail /> },
      {
        path:"/book-tour/:id",
        element:<Booking/>
      },
      { path: "/my-bookings", 
        element: <MyBookings /> 
      },
      {
        path:"/payment",
        element:<Payment/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routerProvider} />
  </StrictMode>,
)
