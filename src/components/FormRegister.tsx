import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUser } from "react-icons/fi";
import { CiAt } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { MdOutlinePassword } from "react-icons/md";

const schema = z.object({
  name: z.string().min(3, {message:"Nome não pode estar vazio"}),
  email: z.string().email("E-mail inválido"),
  password: z.string()
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
     message: "A senha deve ter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.",
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
   message: "As senhas não são iguais",
});

type FormData = z.infer<typeof schema>;

export default function FormRegister() {


  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form className="bg-primary shadow-2xl w-80 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="flex justify-center mt-8 mb-6 pt-8 mx-11 items-center font-semibold text-4xl">
        Crie seu herói
      </h1>
      <div className="relative mb-4 mx-6">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary">
          <FiUser />
        </span>
        <input
          type="text"
          id="name"
          placeholder="Nome Completo"
          className="block w-full pl-10 pr-4 py-2 my-2 bg-gray-light rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          {...register('name')}
        />
        {errors.name && <span className="block mt-1 text-xs text-secondary">{errors.name.message?.toString()}</span>}
      </div>
      <div className="relative mb-4 mx-6">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary">
          <CiAt />
        </span>
        <input
          type="email"
          id="email"
          placeholder="E-mail"
          className="block w-full pl-10 pr-4 py-2 my-2 bg-gray-light rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          {...register('email')}
        />
        {errors.email && <span className="block mt-1 text-xs text-secondary">{errors.email.message?.toString()}</span>}
      </div>
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
            {...register('password')}
          />
          {errors.password && <span className="block mt-1 text-xs text-secondary">{errors.password.message?.toString()}</span>}
        </div>
      </div>
      <div className="relative mb-4 mx-6">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary">
            <MdOutlinePassword />
          </span>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirme a senha"
            className="block w-full pl-10 pr-4 py-2 my-2 bg-gray-light rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <span className="block mt-1 text-xs text-secondary">{errors.confirmPassword.message?.toString()}</span>}
        </div>
      </div>
      <button
        type="submit"
        className="bg-secondary font-bold text-2xl text-primary border-2 flex items-center justify-center border-secondary w-72  h-11 rounded-md mx-4 hover:bg-primary hover:text-secondary hover:border-secondary transition-colors"
      >
        Cadastrar
      </button>

      <span className="flex items-center justify-center mt-3 pb-8 font-normal text-xs">
        Já tem uma conta?{" "}
        <a
          href="#"
          className="text-secondary hover:text-primary transition-colors"
        >
          Clique aqui!
        </a>
      </span>
    </form>
  )
  }
