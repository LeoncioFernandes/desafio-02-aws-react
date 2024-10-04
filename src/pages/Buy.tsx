import { useState } from "react";
import axios from "axios";
import { GrLocation } from "react-icons/gr";
import { PiCurrencyDollarThin, PiCreditCardLight, PiBank } from "react-icons/pi";
import { FaMoneyBill } from "react-icons/fa";

export default function Buy() {
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [methodPayment, setMethodPayment] = useState("")
  const [deliveryFee, setDeliveryFee] = useState((Math.floor(Math.random() * (60 - 6 + 1) + 6) / 2).toFixed(2))


  const getCepInfo = async (cep: string) => {
    console.log("pesquisa do cep", cep)

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      console.log("dados do cep", data)
      if (!data.erro) {
        setStreet(data.logradouro);
        setCity(data.localidade);
        setState(data.uf);
        setNeighborhood(data.bairro)
      } else {
        alert("CEP não encontrado.");
      }
    } catch (error) {
      alert("Erro ao buscar CEP.");
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value;
    console.log("VALOR DO CEP", cepValue)
    setCep(cepValue);
    console.log("tamanho do cep", cepValue.length)
    if (cepValue.length === 9) {
      console.log("entrei aqui")
      getCepInfo(cepValue);
    }
  };


  const checkout = () => {
    const checkoutData = {
      street,
      number,
      neighborhood,
      city,
      state,
      methodPayment,
    };
    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    window.location.href = "/sucessfull"; 
  };

  const totalValue = Number(29.70);


  return (
    <div className="grid justify-center xs: mx-2"> 
    <h1 className="font-extrabold text-blackText text-6xl text-center my-8 xs:text-3xl ls:4xl">Finalize a Compra</h1>
      <div className="text-start w-full max-w-[640px] bg-gray-light rounded-md p-2 sm:p-10  xs:p-4 xs:w-full xs:content-center  ls:p-2">
        
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
              

              <form className="flex flex-col gap-4 mt-8">
              <input
                type="text"
                id="cep"
                placeholder="00000-000"
                value={cep}
                onChange={handleCepChange}
                className="max-w-[200px] p-3 border border-gray-dark rounded-md shadow-sm  sm:text-sm outline-none xs:w-full"
                
              />

              <input
                type="text"
                id="rua"
                name="rua"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Nome da rua"
                className="p-3 border border-gray-dark rounded-md shadow-sm  sm:text-sm outline-none"
              />

              <div className="flex w-full gap-3 flex-col sm:flex-row">
 
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Número"
                    className="sm:w-[200px] p-3 border border-gray-dark rounded-md shadow-sm  sm:text-sm outline-none "
                  />


 
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    placeholder="Complemento"
                    className=" flex-auto p-3 border border-gray-dark rounded-md shadow-sm  sm:text-sm outline-none"
                  />

              </div>

              <div className="flex gap-3 flex-col sm:flex-row">

            <input
              type="text"
              id="bairro"
              name="bairro"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="Bairro"
              className="sm:min-w-[200px] p-3 border border-gray-dark rounded-md shadow-sm  sm:text-sm outline-none"
            /> 


            <div className="flex gap-3 w-full">
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Cidade"
              className="flex-auto p-3 border border-gray-dark rounded-md shadow-sm  sm:text-sm outline-none"
            /> 



            <input
              type="text"
              id="sigla"
              name="sigla"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="UF"
              className="w-16 p-3 border border-gray-dark rounded-md shadow-sm sm:text-sm text-center outline-none"
            /> 
        </div>
        </div>
        
      </form>
      </div>

      <section className="mb-60 max-w-3xl text-start bg-gray-light rounded-md p-10 mt-3 xs:px-2 xs:py-10 xs:max-w-90 xs:mb-10">
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

        <div className="flex justify-between mt-8 gap-3 xs:flex-wrap xs:w-[360] box-border">
          <button
            onClick={() => setMethodPayment("Cartão de Crédito")}
            className={`flex items-center gap-3 w-full px-4 py-4 text-blackText text-center rounded-lg ${
              methodPayment === "Cartão de Crédito"
                ? "bg-secondary2 border-2 border-secondary"
                : "bg-gray-dark"
            }`}
          >
          <PiCreditCardLight className="text-secondary w-4 h-4"/>  CARTÃO DE CRÉDITO
          </button>

          <button
            onClick={() => setMethodPayment("Cartão de Débito")}
            className={`flex items-center gap-3 w-full px-4 py-4 text-blackText text-center rounded-lg ${
              methodPayment === "Cartão de Débito"
                ? "bg-secondary2 border-2 border-secondary"
                : "bg-gray-dark"
            }`}
          >
          <PiBank className="text-secondary w-4 h-4"/>
          CARTÃO DE DÉBITO
          </button>

          <button
            onClick={() => setMethodPayment("Dinheiro")}
            className={`flex items-center gap-3 w-full px-4 py-4 text-blackText text-center rounded-lg ${
              methodPayment === "Dinheiro"
                ? "bg-secondary2 border-2 border-secondary"
                : "bg-gray-dark"
            }`}
          >
          <FaMoneyBill className="text-secondary w-4 h-4"/> DINHEIRO
          </button>
        
        </div>
      </section>


      <footer className="grid fixed bottom-0 w-full bg-primary justify-center border-t border-t-gray-dark xs:mt-21 ">
        <div className="grid grid-cols-2 gap-4 w-[720px] justify-between my-4 xs:hidden">
  <div className="grid gap-y-3">

    <p>Total de Itens</p>
    <p>Entrega</p>
    <p><strong>Total</strong></p>
  </div>


  <div className="grid text-end gap-y-3">
    <p>R$ {totalValue.toFixed(2)}</p>
    <p>R$ {deliveryFee}</p>
    <p><strong>R$ {(totalValue + parseFloat(deliveryFee)).toFixed(2)}</strong></p>
  </div>
</div>

<div className="flex justify-center mt-4"> 
    <button 
      type="submit"
      className="bg-secondary text-white px-14 py-2 rounded-lg mb-4"
      onClick={checkout}
    >
      Finalizar Compra
    </button>
</div>

            
        </footer> 
 </div> 

  )
}
