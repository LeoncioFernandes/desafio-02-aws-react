import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import EmptyCart from "../components/EmptyCart";
import { useCart } from "../context/useShoppingCart";

export default function ShoppingCart() {
  const cart = useCart()

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-extrabold text-[32px] sm:text-6xl my-8 sm:mt-8">Meu Carrinho</h1>
      {cart.items.length != 0 ? cart.items.map(item => (
        <CartItemCard
          id={item.id}
          key={item.id}
          img={item.img}
          title={item.title}
          price={item.price}
        />
      )) : <EmptyCart />}

      {cart.items.length != 0 ? (
        <footer className='fixed text-center bottom-0 w-full bg-white py-4'>
          <Link to={"/Buy"}>
            <button className="bg-secondary w-[300px] h-[45px] text-2xl text-white rounded-2xl">Comprar</button>
          </Link>
        </footer>
      ) : ''}
    </div>
  )
}
