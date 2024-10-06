import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { GrLocation } from "react-icons/gr";
import { PiCurrencyDollarThin, PiCreditCardLight, PiBank } from "react-icons/pi";
import { FaMoneyBill } from "react-icons/fa";
import { useCart } from '../context/useShoppingCart';


const checkoutSchema = z.object({
  cep: z.string().min(9, "CEP inválido"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "UF é obrigatória"),
  methodPayment: z.string().min(1, "Método de pagamento é obrigatório")
});

export default function Buy() {
  const { register, handleSubmit, setValue, getValues, formState: { errors }, reset, trigger } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const totalCartValue = useCart((state) => state.getTotalCartPrice());
  const [deliveryFee, setDeliveryFee] = useState(0); 
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const fee = Math.floor(Math.random() * (60 - 6 + 1) + 6) / 2; 
    setDeliveryFee(fee);
  }, []);

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    setValue('methodPayment', method);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue('cep', value);

    await trigger('cep');
    
    if (value.length === 9) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
        const data = response.data;
  
        if (!data.erro) {
          setValue('street', data.logradouro);
          setValue('neighborhood', data.bairro);
          setValue('city', data.localidade);
          setValue('state', data.uf);
        } else {
          console.error("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
  };

  const checkout = () => {
    const error = handleFinishPurchase();
    if (error) {
      return error;
    }
    reset();
    window.location.href = "/sucessfull";
  };

  const handleFinishPurchase = () => {
    const formData = getValues();
    const validation = checkoutSchema.safeParse(formData);

    if (!validation.success) {
      console.log("Erros de validação", validation.error);
      return true;
    }

    sessionStorage.setItem("checkoutData", JSON.stringify(validation.data));
    return false;
  };


  const totalValue = totalCartValue + Number(deliveryFee);

  return (
    <div className="grid justify-center xs:mx-2 ls:mx-2">
      <h1 className="font-extrabold text-blackText text-6xl text-center my-8 xs:text-3xl">Finalize a Compra</h1>
      <div className="text-start w-full max-w-[720px] bg-gray-light rounded-md p-2 sm:p-10 xs:p-4 xs:w-full xs:content-center">
        
        <div className="flex gap-2">
          <div>
            <GrLocation className="text-secondary w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Endereço de entrega</h2>
            <p className="text-gray-700 col-start-2">
              Informe o endereço onde deseja receber seu pedido.
            </p>
          </div>
        </div>
        
        <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit(checkout)}>
        <div className="flex flex-col">
        <input
            type="text"
           placeholder="00000-000"
            {...register("cep")}
            onChange={handleCepChange}
      className="max-w-[200px] p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none xs:w-full"
        />
        {errors.cep && typeof errors.cep.message === 'string' && (
      <p className="text-red-500 text-sm mt-1">{errors.cep.message}</p>)}
        </div>

          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Nome da rua"
              {...register("street")}
              className="p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
            />
                {errors.street && typeof errors.street.message === 'string' && (
      <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>)}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Número"
                {...register("number")}
                className="sm:w-[200px] p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
              />
                  {errors.number && typeof errors.number.message === 'string' && (
      <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>)}
            </div>

            <div className="flex flex-col flex-auto">
              <input
                type="text"
                placeholder="Complemento"
                {...register("complement")}
                className="p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Bairro"
                {...register("neighborhood")}
                className="sm:min-w-[200px] p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
              />
                 {errors.neighborhood && typeof errors.neighborhood.message === 'string' && (
      <p className="text-red-500 text-sm mt-1">{errors.neighborhood.message}</p>)}
            </div>

            <div className="flex flex-col flex-auto">
              <input
                type="text"
                placeholder="Cidade"
                {...register("city")}
                className="p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
              />
                  {errors.city && typeof errors.city.message === 'string' && (
      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p> )}
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder="UF"
                {...register("state")}
                className="w-16 p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm text-center outline-none"
              />
              {errors.state && typeof errors.state.message === 'string' && (
      <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>)}
            </div>
          </div>
        </form>
      </div>

      <form className="mb-60 max-w-3xl text-start bg-gray-light rounded-md p-10 mt-3 xs:px-2 xs:py-10 xs:max-w-90 xs:mb-20">
        <div className="flex gap-2">
          <div>
            <PiCurrencyDollarThin className="text-secondary w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl text-tertiary">Pagamento</h2>
            <p className="text-blackText col-start-2">
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </p>
          </div>
        </div>

        <div className="flex mt-8 gap-3 xs:flex-wrap xs:w-[360] box-border">
          <button
          type="button"
          onClick={() => handlePaymentMethodChange("Cartão de Crédito")}
            className={`flex items-center gap-3 w-full px-4 py-4 text-blackText text-center rounded-lg whitespace-nowrap ${
              getValues('methodPayment') === "Cartão de Crédito"
                ? "bg-secondary2 border-2 border-secondary"
                : "bg-gray-dark"
            }`}
          >
            <PiCreditCardLight className="text-secondary w-4 h-4"/>  CARTÃO DE CRÉDITO
          </button>

          <button
          type="button"
          onClick={() => handlePaymentMethodChange("Cartão de Débito")}
            className={`flex items-center gap-3 w-full px-4 py-4 text-blackText text-center rounded-lg whitespace-nowrap ${
              getValues('methodPayment') === "Cartão de Débito"
                ? "bg-secondary2 border-2 border-secondary"
                : "bg-gray-dark"
            }`}
          >
            <PiBank className="text-secondary w-4 h-4"/>
            CARTÃO DE DÉBITO
          </button>

          <button
          type="button"
          onClick={() => handlePaymentMethodChange("Dinheiro")}
            className={`flex items-center gap-3 w-full px-4 py-4 text-blackText text-center rounded-lg whitespace-nowrap ${
              getValues('methodPayment') === "Dinheiro"
                ? "bg-secondary2 border-2 border-secondary"
                : "bg-gray-dark"
            }`}
          >
            <FaMoneyBill className="text-secondary w-4 h-4"/> DINHEIRO
          </button>
        </div>
        {errors.methodPayment && (
          <p className="text-red-500 mt-2 text-center">
            Selecione uma forma de pagamento
          </p>)}
      </form>

      <footer className="grid fixed bottom-0 w-full bg-primary border-t border-t-gray-dark justify-center">
        <div className="flex flex-col gap-4 w-[620px] my-4 xs:hidden">
          <div className="flex w-full justify-between flex-wrap">
            <p>Total de Itens</p>
            <p>R$ {totalCartValue.toFixed(2)}</p>
          </div>

          <div className="flex justify-between flex-wrap">
            <p>Entrega</p>
            <p>R$ {deliveryFee.toFixed(2)}</p>
          </div>

          <div className="flex justify-between flex-wrap">
            <p><strong>Total</strong></p>
            <p><strong>R$ {totalValue.toFixed(2)}</strong></p>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button 
          type='button'
            className="bg-secondary text-white px-14 py-2 rounded-lg mb-4"
            onClick={handleSubmit(checkout)}
          >
            Finalizar Compra
          </button>
        </div>
      </footer>
    </div>
  );
}