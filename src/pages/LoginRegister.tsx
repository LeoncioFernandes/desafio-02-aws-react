import FormLogin from "../components/FormLogin";
import FormRegister from "../components/FormRegister";
import logo from "../assets/Logo.png";
import spider from "../assets/spider-man.png";
import React from "react";

export default function LoginRegister() {
  const [showLogin, setShowLogin] = React.useState(true);

  const toggleLink = showLogin ? (
    <span>
      Não tem uma conta?{" "}
      <a
        href="#"
        onClick={() => setShowLogin(false)}
        className="text-secondary hover:text-secondary2 transition-colors"
      >
        Clique aqui!
      </a>
    </span>
  ) : (
    <span>
      Já tem uma conta?{" "}
      <a
        href="#"
        onClick={() => setShowLogin(true)}
        className="text-secondary hover:text-secondary2 transition-colors"
      >
        Clique aqui!
      </a>
    </span>
  );

  return (
    <div className=" h-svh flex overflow-hidden">

      <div className="w-1/2 h-full flex justify-center items-center  ">
        <img src={spider} className="object-cover h-full w-full hidden md:block " />
      </div>

      <div className="md:w-1/2 w-full h-screen flex justify-center items-center flex-col px-8">

        <div className="logo mb-6  flex justify-center items-center">
          <img src={logo} className="w-auto h-16"/>
        </div>

        <div className="flex justify-center items-center">
          {showLogin ? (
            <FormLogin toggleLink={toggleLink} />
          ) : (
            <FormRegister
              toggleLink={toggleLink}
              onSuccess={() => setShowLogin(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
