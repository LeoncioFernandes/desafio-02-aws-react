import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Comics from "./pages/Comics"
import LoginRegister from "./pages/LoginRegister"
import Characters from "./pages/Characters"
import ComicsDetails from "./pages/ComicDetails"
import CharacterDetails from "./pages/CharacterDetails"
import ShoppingCart from "./pages/ShoppingCart"
import Buy from "./pages/Buy"
import Sucessfull from "./pages/Sucessfull"

function App() {

  return (
    <>
      <NavBar/>
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

    <Characters />

    </>
  )
}

export default App
