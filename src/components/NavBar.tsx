import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className='flex items-center justify-between drop-shadow-lg p-8 bg-primary'>
      {/* <NavLink
        className={({ isActive }) => (isActive ? "text-red-500" : "")}
        to="/"
      >
        Login
      </NavLink> */}
      <div className='flex gap-2.5 items-center'>
        <img className='w-16 h-16' src="/public/logoUOL.png" alt="Logo UOL" />
        <p className='text-5xl font-extrabold'><span className='text-brand'>UOL</span>Comics</p>
      </div>
      
      <div className='flex items-center gap-8 text-2xl p-2.5'>
        <div className='flex gap-4'>
          <NavLink
            className={({ isActive }) => (isActive ? "text-brand" : "")}
            to="/comics"
          >
            Quadrinhos
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-brand" : "")}
            to="/characters"
          >
            Personagens
          </NavLink>
        </div>
        
        <NavLink
          className={({ isActive }) => (isActive ? "text-brand" : "")}
          to="/shopping-cart"
        >
          Carrinho
        </NavLink>
        <NavLink
          className="text-primary bg-brand px-3 py-2 rounded-lg"
          to="/"
        >
          Sair
        </NavLink>
      </div>
    </nav>
  )
}
