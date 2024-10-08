import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { IoSearchSharp, IoCartOutline, IoClose, IoCloseOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { MdOutlineMenu } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/useShoppingCart';
import { userLoged } from '../context/useLogedUser';
import { useSearchItem } from '../context/useSearchItem';

export default function NavBar() {

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [isAnimateClose, setIsAnimateClose] = useState<boolean>(false);
  const [pageActive, setPageActive] = useState<'comics' | 'characters' | null>(null);
  const [placeholder, setPlaceholder] = useState<string>("")

  const navRef = useRef<HTMLElement>(null)
  const [heightNavBar, setHeightNavBar] = useState<number>(0)

  const navigate = useNavigate();
  const cart = useCart()
  const logOffUser = userLoged();
  const { searchTerm, setSearchTerm } = useSearchItem();

  const location = useLocation()

  useEffect(() => {
    const isComicsRoot = location.pathname === "/comics";
    const isCharactersRoot = location.pathname === "/characters";
    const isComicsWithParams = location.pathname.startsWith("/comics/") && !isComicsRoot;
    const isCharactersWithParams = location.pathname.startsWith("/characters/") && !isCharactersRoot;

    if (isComicsRoot) {
      ActivePage("comics");
    } else if (isCharactersRoot) {
      ActivePage("characters");
    } 
    else if (isComicsWithParams || isCharactersWithParams) {
      ActivePage(null);
    }
  }, [location.pathname])

  function CurrentNavBarHeight() {
    if (navRef.current) {
      setHeightNavBar(navRef.current.clientHeight)
    }
  }

  useEffect(() => {
    setHeightNavBar(navRef.current!.clientHeight)
    window.addEventListener('load', CurrentNavBarHeight);
    window.addEventListener('resize', CurrentNavBarHeight);

    return () => {
      window.removeEventListener('load', CurrentNavBarHeight);
      window.removeEventListener('resize', CurrentNavBarHeight)
    };
  }, [navRef.current?.clientHeight])

  function ActivePage(page: 'comics' | 'characters' | null) {
    setPageActive(page)
    if (page == "comics") {
      setPlaceholder("Pesquisar por título...");
    } else if (page == "characters") {
      setPlaceholder("Pesquisar por nome...");
    } else {
      setPlaceholder("");
    }
  }

  const openMenu = () => {
    document.body.style.overflow = "hidden"
    setMenuVisible(true);
    setIsAnimateClose(true);

  };

  const closeMenu = () => {
    setMenuVisible(false);
    document.body.style.overflow = ""
  };

  const logOff = () => {
    logOffUser.removeUserLoged();
    navigate("/");
  }

  function resetSearchBar(){
    setSearchTerm("")
  }

  return (
    <>
      <nav ref={navRef} className='fixed flex w-full items-center justify-between flex-wrap md:flex-nowrap drop-shadow-lg p-3 lg:p-6 xl:p-8 gap-6 xl:gap-16 bg-primary z-10'>

        {/* LOGO */}
        <div className='flex gap-2.5 items-center'>
          <img className='w-8 lg:w-12 xl:w-16 h-8 lg:h-12 xl:h-16' src="/public/logoUOL.png" alt="Logo UOL" />
          <p className='text-2xl xl:text-5xl font-extrabold'><span className='text-secondary'>UOL</span>Comics</p>
        </div>

        {/* BARRA DE PESQUISA */}
        {pageActive != null && (
          <div className='relative flex px-4 py-1 md:py-4 items-center grow max-w-xl gap-2.5 bg-gray-light rounded-full order-last sm:order-none'>
            <IoSearchSharp className='w-5 lg:w-6 xl:w-8 h-5 lg:h-6 xl:h-8 text-gray-dark' />
            <input
              className='bg-inherit rounded-r-full w-full text-base lg:text-xl xl:text-2xl placeholder:text-gray-dark placeholder:leading-4 outline-none'
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} placeholder={placeholder}
            />
            {searchTerm && (
              <IoCloseOutline onClick={resetSearchBar} className='absolute right-4 w-5 lg:w-6 xl:w-8 h-5 lg:h-6 xl:h-8 text-secondary hover:cursor-pointer' />
            )}
          </div>
        )}

        <div className='flex items-center gap-8 lg:text-xl xl:text-2xl px-2.5'>

          {/* NAVEGAÇÃO */}
          <div className='hidden md:flex gap-4'>
            <NavLink
              className={({ isActive }) => (isActive ? "text-secondary" : "")}
              to="/comics" end
            >   
              Quadrinhos
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "text-secondary" : "")}
              to="/characters" end
            >
              Personagens 
            </NavLink>
          </div>

          {/* CARRINHO DE COMPRAS */}
          <NavLink
            className={({ isActive }) => (isActive ? "bg-secondary rounded-full text-primary" : "hover:bg-secondary hover:rounded-full hover:text-primary group")}
            to="/shopping-cart"
          >
            {({ isActive }) => {
              if (isActive) {
                ActivePage(null)
              }
              return (
                <div className=' relative w-10 md:w-14 h-10 md:h-14 p-2'>
                  {cart.items.length > 0 && (
                    <div className={`absolute right-2 md:right-2.5 top-1 md:top-1.5 w-1.5 md:w-2 h-1.5 md:h-2 rounded-full group-hover:bg-tertiary ${isActive ? "bg-tertiary" : "bg-secondary"}`}></div>
                  )}
                  <IoCartOutline className='w-full h-full' />
                </div>
              )
            }}
          </NavLink>

          {/* SAIR */}
          <button
            className="hidden md:flex items-center gap-2 text-primary bg-secondary px-3 py-2 rounded-[9px] border-[1px] border-transparent hover:bg-primary hover:text-secondary hover:border-secondary"
            onClick={logOff}
          >
            <PiSignOutBold className='w-6 h-6' />
            Sair
          </button>

          {/* MENU SANDUÍCHE */}
          <button
            onClick={openMenu}
            className='flex md:hidden'
          >
            <MdOutlineMenu className='h-8 w-8' />
          </button>

        </div>
      </nav>

      {/* COMPENSAÇÃO NAVBAR FIXA */}
      <div style={{ height: heightNavBar }}></div>

      {/* FUNDO BLUR MENU SANDUÍCHE */}
      <div
        onClick={closeMenu}
        className={`${menuVisible ? "block" : "hidden"} fixed w-screen h-screen inset-0 backdrop-blur-sm overflow-hidden bg-black/50 z-10`}>
      </div>

      {/* MENU SANDUÍCHE ABERTO */}
      <div className={`fixed top-0 right-0 ${menuVisible ? "animate-to-open" : isAnimateClose && "animate-to-close"} flex flex-col gap-[18px] w-0 h-svh overflow-hidden pt-3.5 bg-primary z-10`}>

        {/* BUTTON FECHAR */}
        <div className='flex justify-end'>
          <IoClose onClick={closeMenu} className='text-gray-dark w-4 h-4 mr-5 hover:cursor-pointer' />
        </div>

        {/* NAVEGAÇÃO */}
        <div className='flex flex-col gap-8 w-fit ml-3'>
          <div className='flex flex-col gap-4 text-base font-extrabold'>
            <p className='text-gray-dark'>Páginas</p>
            <div className='flex flex-col gap-2'>
              <NavLink
                className={({ isActive }) => (isActive ? "text-secondary" : "")}
                to="/comics" end
              >
                Quadrinhos
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? "text-secondary" : "")}
                to="/characters" end
              >
                Personagens
              </NavLink>
            </div>
          </div>

          {/* SAIR */}
          <button
            className="flex items-center justify-center gap-2 text-primary bg-secondary py-1 rounded-[9px] border-[1px] border-transparent active:bg-primary active:text-secondary active:border-secondary"
            onClick={logOff}
          >
            <PiSignOutBold className='w-4 h-4' />
            <div>Sair</div>
          </button>

        </div>
      </div>
    </>
  )
}
