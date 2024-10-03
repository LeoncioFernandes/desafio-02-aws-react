import { BiLoaderCircle } from "react-icons/bi";

export default function Loader() {
  return (
    <div>
      <div className="flex justify-center animate-spin">
          <BiLoaderCircle className="w-20 h-20 text-secondary" />
        </div>
    </div>
  )
}
