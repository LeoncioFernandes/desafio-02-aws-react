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
    <div className="page flex  h-full overflow-hidden">
      <div className="spider-man w-1/2 object-fill">
        <img src={spider} />
      </div>
      <div className="w-1/2">
        <div className="logo ">
          <img src={logo} />
        </div>
        <div className="forms">
          {showLogin ? (
            <FormLogin toggleLink={toggleLink} />
          ) : (
            <FormRegister toggleLink={toggleLink} />
          )}
        </div>
      </div>
    </div>
  );
}
