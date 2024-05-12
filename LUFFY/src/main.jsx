import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/query.js";

//pages
import RootLayout from "./pages/RootLayout.jsx";




const router = createBrowserRouter([
	// 메인 페이지
	{
		path: "/",
		element: <RootLayout />,
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)


