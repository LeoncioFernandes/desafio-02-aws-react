import { MdShoppingCart } from "react-icons/md";

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center gap-4 mt-14">
            <MdShoppingCart className="text-secondary w-[123px] h-[123px] sm:w-52 sm:h-52" />
            <h1 className="text-[40px] sm:text-[64px] font-extrabold">Carrinho vazio :(</h1>
            <span className="text-base sm:text-2xl font-semibold">Adicione alguns itens ao seu carrinho!</span>
        </div>
    )
}
