import CartItemCard from "../components/CartItemCard";
import { useCart } from "../context/useShoppingCart";

export default function ShoppingCart() {
  const cart = useCart()

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-extrabold text-[32px] sm:text-6xl my-8 sm:mt-8">Meu Carrinho</h1>
      {cart.items.map(item => (
        <CartItemCard
          key={item.id}
          img={item.img}
          title={item.img}
          price={item.price}
        />
      ))}
    </div>
  )
}
