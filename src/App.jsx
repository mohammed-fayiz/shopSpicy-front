import {Routes, Route} from "react-router-dom"
import Register from "./components/register"
import Login from "./components/login"
import Dashboard from "./components/admin/adminDashboard"
import UserList from "./components/admin/userList"
import ProductPage from "./components/admin/manageProduct"
import FarmerMain from "./components/admin/productNav/farmer"
import AddProdFarmer from "./components/admin/productNav/addProdFarmer"
import FarmerHome from "./components/user/farmer/farmerHome"
import WholesailerHome from "./components/user/wholesailer/wholesailerHome"
import RetailerHome from "./components/user/retailer/retailerHome"
import FarmerService from "./components/user/farmer/farmerService"
import AdFarmerService from "./components/admin/productNav/farmer/adFarmerService"
import FarmerProducts from "./components/user/farmer/farmerProducts"
import AddFarmerRes from "./components/admin/productNav/addFarmerRes"
import OrderList from "./components/admin/orderList"
import FarmerCart from "./components/user/farmer/farmerCart"
import FarmerOrder from "./components/user/farmer/farmerOrder"
import WholeAddProd from "./components/user/wholesailer/wholeAddProd"
import WholeBuy from "./components/user/wholesailer/wholeBuy"
import WholeDashboard from "./components/user/wholesailer/wholeDashboard"
import WholeOrder from "./components/user/wholesailer/wholeOrder"
import WholesailerMain from "./components/admin/productNav/wholeSailer"
import AllProducts from "./components/admin/productNav/orderWindow"
import RetailerProduct from "./components/user/retailer/retailerProducts"
import RetailerCart from "./components/user/retailer/reatailerCart"
import RetailerOrder from "./components/user/retailer/retailerOrders"
import Footer from "./components/footer"

function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>
      <Route path="/admin/userslist" element={<UserList/>}/>
      <Route path="/admin/product" element={<ProductPage/>}/>
      <Route path="/admin/product/farmer" element={<FarmerMain/>}/>
      <Route path="/admin/product/wholesailer" element={<WholesailerMain/>}/>
      <Route path="/admin/product/farmer/addprod" element={<AddProdFarmer/>}/>
      <Route path="/admin/product/farmer/service" element={<AdFarmerService/>}/>
      <Route path="/admin/product/farmer/addfarmres" element={<AddFarmerRes/>}/>
      <Route path="/admin/orderlist" element={<OrderList/>}/>
      <Route path="/admin/allproducts" element={<AllProducts/>}/>
     
      <Route path="/user/farmer" element={<FarmerHome/>}/>
      
      
      <Route path="/user/farmer/service" element={<FarmerService/>}/>
      <Route path="/user/farmer/products" element={<FarmerProducts/>}/>
      <Route path="/user/farmer/cart" element={<FarmerCart/>}/>
      <Route path="/user/farmer/orders" element={<FarmerOrder/>}/>

      <Route path="/user/wholesailer" element={<WholesailerHome/>}/>
      <Route path="/user/wholesailer/addproduct" element={<WholeAddProd/>}/>
      <Route path="/user/wholesailer/wholebuy" element={<WholeBuy/>}/>
      <Route path="/user/wholesailer/wholedashboard" element={<WholeDashboard/>}/>
      <Route path="/user/wholesailer/wholeorder" element={<WholeOrder/>}/>

      <Route path="/user/retailer" element={<RetailerHome/>}/>
      <Route path="/user/retailer/products" element={<RetailerProduct/>}/>
      <Route path="/user/retailer/cart" element={<RetailerCart/>}/>
      <Route path="/user/retailer/order" element={<RetailerOrder/>}/>
      
     </Routes>
     <Footer/>
    </>
  )
}

export default App
