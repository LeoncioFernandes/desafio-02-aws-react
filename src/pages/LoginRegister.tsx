// import FormLogin from "../components/FormLogin";
import FormRegister from "../components/FormRegister";
import logo from "../assets/Logo.png";
import spider from "../assets/spider-man.png";

export default function LoginRegister() {
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
          <FormRegister />
          {/* <FormLogin/> */}
        </div>
      </div>
    </div>
  );
}
