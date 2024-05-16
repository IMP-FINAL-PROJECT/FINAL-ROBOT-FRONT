import { Outlet, Navigate } from "react-router-dom";
import NavBar from "../components/Common/NavBar";
import useUserStore from "../stores/useUserStore";
import useCounselStore from "../stores/useCounselStore";
import { useEffect } from "react";

export default function RootLayout() {
  const { userId } = useUserStore();

  const { reset: counselReset } = useCounselStore();
  const { reset: userReset } = useUserStore();

  useEffect(() => {
    
  }, []);

  return (
    <>
      {userId ? (
        <div className="grid grid-cols-mainLayout gap-5 bg-beige20">
          <NavBar />
          <div className="col-span-10 mx-5">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/user" replace />
      )}
    </>
  );
}
