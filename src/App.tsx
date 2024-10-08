import { Routes, Route, NavLink, useNavigate } from "react-router-dom"
import NavBar from "./components/NavBar"
import Comics from "./pages/Comics"
import LoginRegister from "./pages/LoginRegister"
import Characters from "./pages/Characters"
import ComicsDetails from "./pages/ComicDetails"
import CharacterDetails from "./pages/CharacterDetails"
import ShoppingCart from "./pages/ShoppingCart"
import Buy from "./pages/Buy"
import Sucessfull from "./pages/Sucessfull"
import { useState } from "react"
import { userLoged } from "./context/useLogedUser"
import { useCart } from "./context/useShoppingCart"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [viewNavBar, setViewNavBar] = useState<boolean>(false)
  const cart = useCart();

  const navigate = useNavigate();
  const useLoged = userLoged();
  if(!useLoged.userLoged.isLoged){
    if(viewNavBar){
      navigate("/");
    }
  }

  if(cart.items.length == 0){
    sessionStorage.removeItem("checkoutData")
  }

  return (
    <>
      <NavLink to="/" end>
        {({isActive}) => {
          if(isActive){
            setViewNavBar(false)
          }
          else{
            setViewNavBar(true)
          }
          return <></>
        }}
      </NavLink>

      {viewNavBar && (
        <NavBar/>
      )}
      <Routes>
        <Route path="/" element={<LoginRegister/>}/>
        <Route path="/comics" element={<Comics/>}/>
        <Route path="/comics/:id" element={<ComicsDetails/>}/>
        <Route path="/characters" element={<Characters/>}/>
        <Route path="/characters/:id" element={<CharacterDetails/>}/>
        <Route path="/shopping-cart" element={<ShoppingCart/>}/>
        <Route path="/buy" element={<Buy/>}/>
        <Route path="/sucessfull" element={<Sucessfull/>}/>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
