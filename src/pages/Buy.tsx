import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { GrLocation } from "react-icons/gr";
import { PiCurrencyDollarThin, PiCreditCardLight, PiBank } from "react-icons/pi";
import { FaMoneyBill } from "react-icons/fa";

const checkoutSchema = z.object({
  cep: z.string().min(9, "CEP inválido"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "UF é obrigatória"),
  methodPayment: z.string().optional()
});

export default function Buy() {
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [methodPayment, setMethodPayment] = useState("")
  const [error, setError] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState((Math.floor(Math.random() * (60 - 6 + 1) + 6) / 2).toFixed(2))


  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue('cep', value);
    setCep(value)
    
    if (value.length === 9) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();
  
        if (!data.erro) {
          setValue('street', data.logradouro);
          setStreet(data.logradouro)
          setValue('neighborhood', data.bairro);
          setNeighborhood(data.bairro)
          setValue('city', data.localidade);
          setCity(data.localidade)
          setValue('state', data.uf);
          setState(data.uf)
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
    if(error){
      return error;
    }

    window.location.href = "/sucessfull"; 
  };

  const handleFinishPurchase = () => {
    if(methodPayment.length<3){
      setError(true);
      return true;  
    }
    const formData = {
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      methodPayment,
    };

    console.log("formData", formData)

    const validation = checkoutSchema.safeParse(formData);

    console.log("VALIDACAO", validation)

    if (!validation.success) {
      return true;
    } else {
      sessionStorage.setItem("checkoutData", JSON.stringify(validation.data));
      return false;
      
    }
  };

  const totalValue = Number(29.70);


  return (
    <div className="grid justify-center xs:mx-2 ls:mx-2"> 
    <h1 className="font-extrabold text-blackText text-6xl text-center my-8 xs:text-3xl">Finalize a Compra</h1>
      <div className="text-start w-full max-w-[720px] bg-gray-light rounded-md p-2 sm:p-10  xs:p-4 xs:w-full xs:content-center">
        
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
                  {typeof errors.cep?.message === 'string' && <p className="text-red-500 text-sm mt-1">{errors.cep.message}</p>}
                </div>

                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Nome da rua"
                    {...register("street")}
                    onChange={(e) => setStreet(e.target.value)}
                    className="p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
                  />
                  {typeof errors.street?.message === 'string' && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Número"
                      {...register("number")}
                      onChange={(e) => setNumber(e.target.value)}
                      className="sm:w-[200px] p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
                    />
                    {typeof errors.number?.message === 'string' && <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>}
                  </div>

                  <div className="flex flex-col flex-auto">
                    <input
                      type="text"
                      placeholder="Complemento"
                      {...register("complement")}
                      onChange={(e) => setComplement(e.target.value)}
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
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="sm:min-w-[200px] p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
                    />
                    {typeof errors.neighborhood?.message === 'string' && <p className="text-red-500 text-sm mt-1">{errors.neighborhood.message}</p>}
                  </div>

                  <div className="flex flex-col flex-auto">
                    <input
                      type="text"
                      placeholder="Cidade"
                      {...register("city")}
                      onChange={(e) => setCity(e.target.value)}
                      className="p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm outline-none"
                    />
                    {typeof errors.city?.message === 'string' && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                  </div>

                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="UF"
                      {...register("state")}
                      onChange={(e) => setState(e.target.value)}
                      className="w-16 p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm text-center outline-none"
                    />
                    {typeof errors.state?.message === 'string' && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                  </div>
                </div>
              </form>


      </div>

      <section className="mb-60 max-w-3xl text-start bg-gray-light rounded-md p-10 mt-3 xs:px-2 xs:py-10 xs:max-w-90 xs:mb-20">
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

        <div className="flex  mt-8 gap-3 xs:flex-wrap xs:w-[360] box-border">
          <button
            onClick={() =>{ 
              setMethodPayment("Cartão de Crédito");
              setError(false);
            }}
            className={`flex  items-center gap-3 w-full px-4 py-4 text-blackText text-center rounded-lg whitespace-nowrap  ${
              methodPayment === "Cartão de Crédito"
                ? "bg-secondary2 border-2 border-secondary"
                : "bg-gray-dark"
            }`}
          >
          <PiCreditCardLight className="text-secondary w-4 h-4"/>  CARTÃO DE CRÉDITO
          </button>

          <button
            onClick={() => {
              setMethodPayment("Cartão de Débito");
              setError(false);
            }}
            className={`flex items-center gap-3 w-full px-4 py-4 text-blackText text-center rounded-lg whitespace-nowrap ${
              methodPayment === "Cartão de Débito"
                ? "bg-secondary2 border-2 border-secondary"
                : "bg-gray-dark"
            }`}
          >
          <PiBank className="text-secondary w-4 h-4"/>
          CARTÃO DE DÉBITO
          </button>

          <button
            onClick={() => {
              setMethodPayment("Dinheiro");
              setError(false);
            }}
            className={`flex items-center gap-3 w-full px-4 py-4 text-blackText text-center rounded-lg whitespace-nowrap ${
              methodPayment === "Dinheiro"
                ? "bg-secondary2 border-2 border-secondary"
                : "bg-gray-dark"
            }`}
          >
          <FaMoneyBill className="text-secondary w-4 h-4"/> DINHEIRO
          </button>
        </div>
        {error && (
          <p className="text-red-500 mt-2 text-center">
            Selecione uma forma de pagamento
          </p>
        )}
      </section>


      <footer className="grid fixed bottom-0 w-full bg-primary border-t border-t-gray-dark justify-center">
  <div className="flex flex-col gap-4 w-[620px] my-4 xs:hidden">
    
    <div className="flex w-full justify-between flex-wrap ">
      <p>Total de Itens</p>
      <p>R$ {totalValue.toFixed(2)}</p>
    </div>

    <div className="flex justify-between flex-wrap ">
      <p>Entrega</p>
      <p>R$ {deliveryFee}</p>
    </div>

    <div className="flex justify-between flex-wrap">
      <p><strong>Total</strong></p>
      <p><strong>R$ {(totalValue + parseFloat(deliveryFee)).toFixed(2)}</strong></p>
    </div>
  </div>

  <div className="flex justify-center mt-4 ">
    <button 
      className="bg-secondary text-white px-14 py-2 rounded-lg mb-4 "
      onClick={handleSubmit(checkout)}
    >
      Finalizar Compra
    </button>
  </div>
</footer>
 </div> 

  )
}