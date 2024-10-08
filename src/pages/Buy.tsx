import React, { useState, useEffect, useRef  } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { GrLocation } from "react-icons/gr";
import { PiCurrencyDollarThin, PiCreditCardLight, PiBank } from "react-icons/pi";
import { FaMoneyBill } from "react-icons/fa";
import { useCart } from '../context/useShoppingCart';
import { useNavigate } from 'react-router-dom';

const checkoutSchema = z.object({
  cep: z.string().min(9, {message: "CEP inválido"}),
  street: z.string().min(1, {message: "Rua é obrigatória"}),
  number: z.string().min(1, {message: "Número é obrigatório"}),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, {message: "Bairro é obrigatório"}),
  city: z.string().min(1, {message: "Cidade é obrigatória"}),
  state: z.string().min(2, {message: "UF é obrigatória"}),
  methodPayment: z.string().min(1, {message: "Método de pagamento é obrigatório"})
});

type FormData = z.infer<typeof checkoutSchema>;

type CepSchema = {
  logradouro: string,
  bairro: string,
  localidade: string,
  uf: string
  erro: boolean
}

export default function Buy() {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const cepRef = useRef<HTMLInputElement>(null);
  const cart = useCart();
  const totalCartValue = cart.getTotalCartPrice()
  const [deliveryFee, setDeliveryFee] = useState(0); 
  const [_paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();
  if(cart.items.length == 0){
    navigate("/shopping-cart")
  }

  useEffect(() => {
    const fee = Math.floor(Math.random() * (60 - 6 + 1) + 6) / 2; 
    setDeliveryFee(fee);
  }, []);

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    setValue('methodPayment', method);
  };

  function maskCep(cep: string) {
    cep = cep.replace(/\D/g, "");
    if(cep.length > 5){
      cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
    }
    if(cep.length > 9){
      cep = cep.slice(0,9);
    }
    return cep;
  }
  
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = maskCep(e.target.value);
    setValue('cep', value);
  
    await trigger('cep');
  
    const cepRegex = /^(?:\d{5}-\d{3}|\d{8})$/;
  
    const numericValue = value.replace(/\D/g, '');
  
    if (cepRegex.test(value)) {
      try {
        const response = await axios.get<CepSchema>(`https://viacep.com.br/ws/${numericValue}/json/`);
        const data = response.data;

        if (!data.erro) {
          setValue('street', data.logradouro);
          setValue('neighborhood', data.bairro);
          setValue('city', data.localidade);
          setValue('state', data.uf);
          clearErrors(['city', 'neighborhood', 'street', 'state']);

          if (cepRef.current) {
            cepRef.current.blur();
          }
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
    else{
      setValue('street', "");
      setValue('neighborhood', "");
      setValue('city', "");
      setValue('state', "");
    }
  };
  
  const checkout = () => {
    const error = handleFinishPurchase();
    if (error) {
      return error;
    }
    reset();
    navigate("/sucessfull")
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
      <h1 className="font-extrabold text-blackText text-[32px] sm:text-[64px] text-center my-8 xs:text-3xl">Finalize a Compra</h1>
      <div className="text-start w-full max-w-[640px] bg-gray-light rounded-md px-2 py-10 sm:p-10 ">
        
        <div className="flex gap-2">
          <div>
            <GrLocation className="text-secondary w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base">Endereço de entrega</h2>
            <p className="text-sm col-start-2">
              Informe o endereço onde deseja receber seu pedido.
            </p>
          </div>
        </div>
        
        <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit(checkout)}>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="00000-000"
              //  ref={cepRef}
              // onChange={handleCepChange}
              {...register("cep", { required: true, onChange: handleCepChange })}
              className="w-[200px] p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none xs:w-full"
            />
            {errors.cep && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cep.message?.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Nome da rua"
              {...register("street")}
              className="p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">
                {errors.street.message?.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Número"
                {...register("number")}
                className="sm:w-[200px] p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.number.message?.toString()}
                </p>
              )}
            </div>

            <div className="flex flex-col flex-auto relative">
              <input
                type="text"
                placeholder="Complemento"
                {...register("complement")}
                className="p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
              />         
              <span className="absolute right-3 top-3 text-gray-dark text-sm">
                Opcional
              </span>
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
              {errors.neighborhood && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.neighborhood.message?.toString()}
                </p>
              )}
            </div>

            <div className="flex xs:flex-row gap-3 flex-auto">
              <div className="flex flex-col flex-1">
                <input
                  type="text"
                  placeholder="Cidade"
                  {...register("city")}
                  className="p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message?.toString()}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-16">
                <input
                  type="text"
                  placeholder="UF"
                  {...register("state")}
                  className="p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm text-center outline-none"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>

        </form>
      </div>

      <form className="mb-60 max-w-[640px] text-start bg-gray-light rounded-md mt-3 px-2 py-10 sm:p-10">
        <div className="flex gap-2">
          <div>
            <PiCurrencyDollarThin className="text-secondary w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base text-tertiary">Pagamento</h2>
            <p className="text-sm text-blackText col-start-2">
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </p>
          </div>
        </div>

        <div className="flex pt-8 flex-col gap-3 sm:flex-row text-xs">
          <button
            type="button"
            onClick={() => handlePaymentMethodChange("Cartão de Crédito")}
            className={`flex items-center gap-3 p-4 text-blackText rounded-lg w-full sm:w-[206px] border ${
              getValues('methodPayment') === "Cartão de Crédito"
                ? "bg-secondary2 border-secondary"
                : "bg-gray-dark border-transparent"
            }`}
          >
            <PiCreditCardLight className="text-secondary w-4 h-4"/>
            <div>CARTÃO DE CRÉDITO</div>
          </button>

          <button
            type="button"
            onClick={() => handlePaymentMethodChange("Cartão de Débito")}
            className={`flex items-center gap-3  p-4 text-blackText  rounded-lg w-full sm:w-[206px] border ${
              getValues('methodPayment') === "Cartão de Débito"
                ? "bg-secondary2 border-secondary"
                : "bg-gray-dark border-transparent"
            }`}
          >
            <PiBank className="text-secondary w-4 h-4"/>
            <div>CARTÃO DE DÉBITO</div>
          </button>

          <button
            type="button"
            onClick={() => handlePaymentMethodChange("Dinheiro")}
            className={`flex items-center gap-3  p-4 text-blackText  rounded-lg w-full sm:w-[206px] border ${
              getValues('methodPayment') === "Dinheiro"
                ? "bg-secondary2 border-secondary"
                : "bg-gray-dark border-transparent"
            }`}
          >
            <FaMoneyBill className="text-secondary w-4 h-4"/>
            <div>DINHEIRO</div>
          </button>
        </div>
        {errors.methodPayment && (
          <p className="text-red-500 mt-2 text-center">
            Selecione uma forma de pagamento
          </p>
        )}
      </form>

      <footer className="grid fixed bottom-0 w-full bg-primary border-t border-t-gray-dark justify-center">
        <div className="hidden flex-col gap-4 w-[620px] my-4 sm:flex">
          <div className="flex w-full justify-between items-center flex-wrap">
            <p className='text-sm'>Total de Itens</p>
            <p>R$ {totalCartValue.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center flex-wrap">
            <p className='text-sm'>Entrega</p>
            <p>R$ {deliveryFee.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center flex-wrap text-xl font-bold">
            <p className=''>Total</p>
            <p>R$ {totalValue.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button 
            type='button'
            className="text-2xl font-bold bg-secondary text-white px-14 py-2 rounded-2xl mb-4 hover:bg-primary hover:text-secondary hover:border-secondary transition duration-300 border border-transparent"
            onClick={handleSubmit(checkout)}
          >
            Finalizar Compra
          </button>
        </div>
      </footer>
    </div>
  );
};