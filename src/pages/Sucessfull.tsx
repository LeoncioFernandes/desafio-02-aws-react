import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { PiCurrencyDollar } from "react-icons/pi";
import { useCart } from '../context/useShoppingCart';

export default function Sucessfull() {

  const deliveryDays = Math.floor(Math.random() * 9) + 2;

  const clearCart = useCart((state) => state.clearCart);
  const navigate = useNavigate();

  const [checkoutData, setCheckoutData] = useState<any>({
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    methodPayment: ""
  })

  useEffect(()=> {
    clearCart();
    const data = sessionStorage.getItem("checkoutData");
    if(data){
      setCheckoutData(JSON.parse(data))
    }else{
      navigate("/comics")
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  bg-primary text-center p-6 gap-16">

      <div className='mt-3'>
      <h1 className="text-4xl text-start font-extrabold mb-2 xs:text-3xl xs:w-48 text-tertiary">Compra realizada!</h1>

      <p className="text-lg mb-6 text-left text-tertiary">Agora é só aguardar que logo as suas comics chegam aí!</p>
      </div>
      
      <div className="grid grid-cols-[auto_1fr] gap-y-8 gap-x-4 text-lg text-left">
        
        <div className="flex justify-center items-center bg-secondary text-white rounded-full w-8 h-8 self-center">
          <FaMapMarkerAlt className='text-lg'/> 
        </div>
        <span className='text-base'>Entrega em <strong>{checkoutData.street}, {checkoutData.number}</strong><br /> {checkoutData.neighborhood} - {checkoutData.city}, {checkoutData.state}</span>
        
        <div className="flex justify-center items-center bg-secondary text-white rounded-full w-8 h-8 self-center">
          <FaClock className='text-lg'/> 
        </div>
        <span className='text-base'>Previsão de entrega <br /> <strong>{deliveryDays} dias úteis</strong> </span>


        <div className="flex justify-center items-center bg-secondary text-white rounded-full w-8 h-8 self-center">
          <PiCurrencyDollar  className='text-lg'/> 
        </div>
        <span className='text-base'>Pagamento na entrega <br /><strong>{checkoutData.methodPayment}</strong></span>
      </div>

      <Link to="/comics">
        <button className="text-2xl bg-secondary text-white border border-transparent py-2 px-12 rounded-full hover:bg-primary hover:text-secondary hover:border-secondary transition duration-300 ">
          Voltar para o início
        </button>
      </Link>
    </div>
  )
}