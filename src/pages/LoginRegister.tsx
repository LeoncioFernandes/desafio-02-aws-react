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
    <div className="max-w-[1440px] max-h-[1024px] flex overflow-hidden">
      <div className="spider-man max-w-4xl w-full">
        <img src={spider} className="object-cover w-full " />
      </div>
      <div className="w-1/2 flex justify-center items-center flex-col">
        <div className="logo ">
          <img src={logo} />
        </div>
        <div className="forms">
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
