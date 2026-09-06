import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AllProducts from "../Pages/AllProducts";
import MyProducts from "../Pages/MyProducts";
import MyBids from "../Pages/MyBids";
import CreateProduct from "../Pages/CreateProduct";
import ProductDetails from "../Pages/ProductDetails";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Logout from "../Pages/Logout";
import AuthLayout from "../Componenets/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "my-products",
        element: <MyProducts />,
      },
      {
        path: "my-bids",
        element: <MyBids />,
      },
      {
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        path: "productDetails/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-gray-800 space-y-4">
        <h1 className="text-6xl font-extrabold text-purple-600">404</h1>
        <p className="text-xl font-bold">Page Not Found</p>
        <p className="text-xs text-gray-500">The page you are looking for does not exist.</p>
      </div>
    ),
  },
]);

export default router;