import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Patients from "./pages/Patients/Patients.tsx";
import VOTPatients from "./pages/VOT-Patients/VOTPatients.tsx";
import Login from "./pages/Login/Login.tsx";
import { useSelector } from "react-redux";
import { AddPatient } from "./pages/AddPatient/AddPatient.tsx";
import { RootState } from "./store/store.tsx";
import { ToastContainer } from "react-toastify";


const App = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/home",
      element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/home" /> : <Login/>,
    },
    {
      path: "/patients",
      element: isAuthenticated ? <Patients /> : <Navigate to="/login" />,
    },
    {
      path: "/vot-patients",
      element: isAuthenticated ? <VOTPatients /> : <Navigate to="/login" />,
    },
    {
      path: "/add-patient",
      element: isAuthenticated ? <AddPatient /> : <Navigate to="/login" />,
    },
    {
      path: "/*",
      element: <Navigate to="/home" />,
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} ></RouterProvider>
    </>
  );
};

export default App;
