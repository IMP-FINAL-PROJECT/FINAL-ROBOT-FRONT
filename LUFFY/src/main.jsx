import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/query.js";
import "./main.css";

//pages
import RootLayout from "./pages/RootLayout.jsx";
import UserMain from "./pages/UserPages/UserMain.jsx";
import Login from "./pages/UserPages/Login";
import Signup from "./pages/UserPages/Signup";



const router = createBrowserRouter([
	// 메인 페이지
	{
		path: "/",
		element: <RootLayout />,
  },
  {
		path: "/user",
		element: <UserMain />,
		//errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				loader: () => redirect("/user/login"),
			},
			{
				path: "login",
				element: <Login />,
			},
      {
				path: "signup",
				element: <Signup />,
			},
		],
	},
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>  
   <RouterProvider router={router} />
  </QueryClientProvider>
)


