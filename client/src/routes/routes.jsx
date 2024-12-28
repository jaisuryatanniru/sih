import Home from "../pages/Home/Home"
import PlantDetails from "../pages/PlantDetails/PlantDetails"
import AboutUs from "../pages/About/AboutUs"
import Category from "../pages/Category/Category"
import PlantList from "../components/PlantList/PlantList"
import Register from "../pages/Login/Register"
import Signin from "../pages/Login/Signin"
import Cart from "../pages/Cart/Cart"
import BookmarkPage from "../pages/Bookmark/BookmarkPage"
import Order from "../pages/Orders/Order"

export const routes = [
    {path:'/home',element:<Home/>},
    {path:'/details/:id',element:<PlantDetails />},
    {path:'/about',element:<AboutUs/>},
    {path:'/',element:<Register />},
    {path:'/category/:categoryName', element:<Category />},
    {path:'/list',element:<PlantList/>},
    {path:'/login',element:<Signin />},
    {path:'/bookmark',element:<BookmarkPage/>},
    {path:'/cart',element:<Cart/>},
    {path:'/orders',element:<Order/>}
  ]