import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import * as ReactDOM from "react-dom"
import { FileProvider } from './FileContext.jsx'

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import UploadBOM from './components/UploadBOM.jsx'
import ViewBOM from './components/ViewBOM.jsx'
import PartNumber from './components/PartNumber.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import Registration from './components/Registration.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },

  {
    path: "/login",
    element: <Login/>
  },
  
  {
    path: "/get",
    element: <UploadBOM/>
  },

  {
    path: "/view",
    element: <ViewBOM/>
  },

  {
    path: "/result",
    element: <PartNumber/>
  },

  {
    path: '/signup',
    element: <Registration/>
  },

  {
    path: "*",
    element: <PageNotFound/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <FileProvider>
      <RouterProvider router={router}/>
    </FileProvider>
   
)

{/*<React.StrictMode>

 </React.StrictMode>, */}