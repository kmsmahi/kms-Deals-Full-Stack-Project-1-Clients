import { createBrowserRouter } from "react-router";
import MainLayout from "../LayOuts/MainLayout";
import Home from "../Pages/Home";
import AllProducts from "../Pages/AllProducts";
import MyProducts from "../Pages/MyProducts";
import MyBids from "../Pages/MyBids";
import CreateProduct from "../Pages/CreateProduct";
import ProductDetails from "../Pages/ProductDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        index:true,
        element:<Home></Home>
      },
      {
        path:'/all-products',
        element:<AllProducts></AllProducts>
      },
      {
        path:'/my-products',
        element:<MyProducts></MyProducts>
      },
      {
        path:'/my-bids',
        element:<MyBids></MyBids>
      },
      {
        path:'/create-product',
        element:<CreateProduct></CreateProduct>
      },
      {
        path:'/productDetails/:id',
        element:<ProductDetails></ProductDetails>
      }
    ]
  },
]);
export default router;