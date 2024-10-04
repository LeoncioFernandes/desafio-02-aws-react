import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { HiOutlineTrash } from "react-icons/hi2";

type CartItem = {
    title: string,
    img: string,
    price: string
}

export default function CartItemCard({title, img, price}: CartItem) {
    const [counter, setCounter] = useState(1)

    const handleDecrement = () => {
        if (counter > 1) {
            setCounter(counter - 1)
        }
    }

    const handleIncrement = () => setCounter(counter + 1)

    return (
        <div className="relative w-80 bg-gray-light rounded-lg mb-8">
            <button className='bg-secondary w-11 h-11 rounded-bl-lg rounded-tr-lg absolute top-0 right-0'><HiOutlineTrash className='w-full h-6 text-white cursor-pointer' /></button>
            <div className='my-8 flex flex-col items-center gap-8'>
                <div className='flex items-center flex-col gap-4'>
                    <img src={img} className="w-[122px]" />
                    <span className="text-base">{title}</span>
                    <div className='flex w-28 h-8 justify-between items-center bg-white rounded-full'>
                        <button onClick={handleDecrement}>
                            <FaMinusCircle className={`w-8 h-8 ${counter < 2 ? 'text-gray-dark' : 'text-secondary'}`} />
                        </button>
                        <span>{counter}</span>
                        <button onClick={handleIncrement}>
                            <FaPlusCircle className='w-8 h-8 text-secondary' />
                        </button>
                    </div>
                </div>
                <span className='text-3xl font-extrabold'>$ {price}</span>
            </div>
        </div>
    )
}