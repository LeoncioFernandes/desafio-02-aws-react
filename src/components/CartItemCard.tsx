import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { HiOutlineTrash } from "react-icons/hi2";
import { useCart } from '../context/useShoppingCart';
import { Link } from 'react-router-dom';

type CartItem = {
    id: string,
    title: string,
    img: string,
    price: number
}

export default function CartItemCard({ id, title, img, price }: CartItem) {
    const [counter, setCounter] = useState(1)

    const handleDecrement = () => {
        if (counter > 1) {
            setCounter(counter - 1)
        }
    }

    const handleIncrement = () => setCounter(counter + 1)

    const removeItem = useCart(state => state.removeItem)

    return (
        <div className="relative w-80 sm:w-[830px] px-4 py-8 bg-gray-light rounded-lg mb-8">
            <button
                onClick={() => removeItem(id)}
                className='bg-secondary w-11 h-11 rounded-bl-lg rounded-tr-lg absolute top-0 right-0'>
                <HiOutlineTrash className='w-full h-6 text-white cursor-pointer' />
            </button>
            <div className='flex flex-col sm:flex-row items-center gap-8'>
                <div className='flex items-center flex-col w-full h-full sm:flex-row sm:justify-between gap-4'>
                    <section className='flex flex-col sm:flex-row items-center gap-4'>
                        <div className='w-[122px] h-[170px]'>
                            <img src={img} className="w-full h-full object-cover object-left-top drop-shadow-xl" />
                        </div>
                        <div className='flex flex-col items-center sm:items-start sm:h-[170px] sm:justify-between gap-4'>
                            <span className="text-base sm:text-[32px] sm:font-medium">{title}</span>
                            <div className='flex sm:mb-8 w-28 h-8 justify-between items-center bg-white rounded-full'>
                                <button onClick={handleDecrement}>
                                    <FaMinusCircle className={`w-8 h-8 ${counter < 2 ? 'text-gray-dark' : 'text-secondary'}`} />
                                </button>
                                <span>{counter}</span>
                                <button onClick={handleIncrement}>
                                    <FaPlusCircle className='w-8 h-8 text-secondary' />
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
                <div className='sm:h-[170px] flex items-end'>
                    <span className='text-3xl font-extrabold'>${price}</span>
                </div>
            </div>
        </div>
    )
}