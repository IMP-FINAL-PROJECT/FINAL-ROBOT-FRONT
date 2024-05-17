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
import Index from "./pages/MainPages/Index.jsx";
import LuffyCallPage from "./pages/LuffyCallPages/LuffyCallPage.jsx";
import LuffyPage from "./pages/MainPages/LuffyPage.jsx";
import TodayQuotesPage from "./pages/MainPages/TodayQuotesPage.jsx";
import UserInfo from "./pages/MainPages/UserInfoPage.jsx";
import DiaryMonthlyPage from "./pages/DiaryPages/DiaryMonthlyPage.jsx";
import DiaryYearlyPage from "./pages/DiaryPages/DiaryYearlyPage.jsx";
import DiaryDailyPage from "./pages/DiaryPages/DiaryDailyPage.jsx";
import DiaryLayout from "./pages/DiaryPages/DiaryLayout.jsx";
// In your component or App.js
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const router = createBrowserRouter([
	// 메인 페이지
	{
		path: "/",
		element: <RootLayout />,
    children: [
			{
				path: "",
				element: <Index />,
				children: [
					{
						path: "luffy",
						element: <LuffyPage />,
					},
					{
						path: "today",
						element: <TodayQuotesPage />,
					},
					{
						path: "UserInfo",
						element: <UserInfo />,
					},
					{
						path: "diary",
						element: <DiaryLayout />,
						children: [
							{
								path: "month",
								element: <DiaryMonthlyPage />,
							},
							{
								path: "year",
								element: <DiaryYearlyPage />,
							},
							{
								path: "day",
								element: <DiaryDailyPage />,
							},
						],
					},
					
				]
      },
	  {
		path: "luffycall",
		element: <LuffyCallPage />,
	},
    ]
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


