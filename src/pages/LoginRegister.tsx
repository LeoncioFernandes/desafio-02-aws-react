import FormLogin from "../components/FormLogin";
import FormRegister from "../components/FormRegister";
import spider from "../assets/spider-man.png";
import { userLoged } from "../context/useLogedUser"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LoginRegister() {

  const navigate = useNavigate();
  const useLoged = userLoged();
  useEffect(() => {
    if(useLoged.userLoged.isLoged){
      navigate("/comics");
    }
  },[])
  
  const [showLogin, setShowLogin] = useState(true);

  function setSuccess(isSuccess: boolean){
    if(isSuccess){
      setShowLogin(true)
    }else{
      setShowLogin(false)
    }
    return
  }

  return (
    <div className="h-svh flex overflow-hidden">

      <div className="hidden md:flex w-1/2 h-full justify-center items-center">
        <img src={spider} className="object-cover h-full w-full" />
      </div>

      <div className="md:w-1/2 w-full h-screen flex justify-center items-center flex-col px-8">

        <div className="logo mb-6 flex justify-center items-center gap-2.5">
          <img src="/public/logoUOL.png" className="w-16 h-16"/>
          <p className='text-5xl leading-[58px] md:text-[64px] md:leading-[77px] font-extrabold'><span className='text-secondary'>UOL</span>Comics</p>
        </div>

        <div className="flex justify-center items-center">
          {showLogin ? (
            <FormLogin onSuccess={setSuccess} />
          ) : (
            <FormRegister onSuccess={setSuccess}/>
          )}
        </div>
      </div>
    </div>
  );
}
