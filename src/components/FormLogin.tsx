import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CiAt } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCreateLoginUser } from "../context/useCreateLoginUser";
import { userLoged } from "../context/useLogedUser";
import { toast } from "react-toastify";

type FormLoginProps = {
  onSuccess: (isSuccess: boolean) => void;
};

const schema = z.object({
  email: z
    .string()
    .email("E-mail inválido"),
  password: z
    .string()
    .min(4, {message: "A senha deve conter pelo menos 4 caracteres"})
    // .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    //   message:
    //     "A senha deve ter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.",
    // }),
});

type FormData = z.infer<typeof schema>;

export default function FormLogin({ onSuccess }: FormLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });


  const navigate = useNavigate();
  const loginUser = useCreateLoginUser();
  const logedUser = userLoged();

  const onSubmit = (data: FormData) => {

    const findUser = loginUser.findUser(data.email, data.password);

    if(findUser){
      logedUser.addUserLoged({id: findUser.id!, name: findUser.name!, email: findUser.email, isLoged: true })
      return navigate("/comics")
    }

    toast.error(
      "Usuário não encontrado.",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-primary shadow-2xl w-80 rounded-lg"
    >
      <h1 className="flex justify-center mt-8 mb-6 mx-11 pt-8 items-center font-semibold text-3xl">
        Escolha seu herói
      </h1>

      <div className="mb-4 mx-6">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary">
            <CiAt />
          </span>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            className="block w-full pl-10 pr-4 py-2 my-2 bg-gray-light rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            {...register("email")}
          />
        </div>
        {errors.email && (
        <span className="px-2 block text-xs text-secondary">
          {errors.email.message?.toString()}
        </span>
      )}
      </div>
      
      <div className="mb-4 mx-6">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary">
            <CiLock />
          </span>
          <input
            type="password"
            id="password"
            placeholder="Senha"
            className="block w-full pl-10 pr-4 py-2 my-2 bg-gray-light rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <span className="px-2 block text-xs text-secondary">
            {errors.password.message?.toString()}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="bg-secondary font-bold text-2xl text-primary border-2 flex items-center justify-center border-secondary w-72  h-11 rounded-md mx-4 hover:bg-primary hover:text-secondary hover:border-secondary transition-colors"
      >
        Entrar
      </button>

      <div className="flex items-center justify-center mt-3 pb-8 font-normal text-xs">
        <span className="flex gap-0.5">
          <p>Não tem uma conta?</p>
          <button
            onClick={() => onSuccess(false)}
            className="text-secondary hover:text-secondary2 transition-colors"
          >
            Clique aqui!
          </button>
        </span>
      </div>
    </form>
  );
}
