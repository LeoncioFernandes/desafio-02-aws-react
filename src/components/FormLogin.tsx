import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CiAt } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { z } from "zod";

type FormLoginProps = {
  toggleLink: React.ReactNode;
};

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z
      .string()
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
          "A senha deve ter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.",
      }),
});

type FormData = z.infer<typeof schema>;


export default function FormLogin({ toggleLink }: FormLoginProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const storedData = sessionStorage.getItem("FormData");

    if (storedData) {

      const parsedData = JSON.parse(storedData);

      if (parsedData.email === data.email && parsedData.password === data.password) {
        console.log("Login bem sucedido", data);
      } else {
        console.log("Usuário não encontrado", data);
      }
    } 
  };
  
  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className="bg-primary shadow-2xl w-80 rounded-lg">
      <h1 className="flex justify-center mt-8 mb-6 mx-11 pt-8 items-center font-semibold text-3xl">
        Escolha seu herói
      </h1>

      <div className="relative mb-4 mx-6">
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
        <span className="ml-7 block text-xs text-secondary">
          {errors.email.message?.toString()}
        </span>
      )}
      <div className="relative mb-4 mx-6">
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
        <span className="ml-7 block text-xs text-secondary">
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
        {toggleLink}
      </div>
    
    </form>
  )
}