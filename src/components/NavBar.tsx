import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
      <NavLink
        className={({ isActive }) => (isActive ? "text-red-500" : "")}
        to="/"
      >
        Login
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-red-500" : "")}
        to="/comics"
      >
        Quadrinhos
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-red-500" : "")}
        to="/characters"
      >
          Personagens
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-red-500" : "")}
        to="/shopping-cart"
      >
        Carrinho
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-red-500" : "")}
        to="/"
      >
        Sair
      </NavLink>
    </nav>
  )
}
