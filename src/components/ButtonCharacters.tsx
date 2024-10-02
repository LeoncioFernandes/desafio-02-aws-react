import { FaPlus } from 'react-icons/fa';

export default function ButtonCharacters(props){
    return (
        <button 
            className="pt-3 pb-3 pr-8 pl-8 text-gray-light bg-secondary rounded-full" 
            onClick={props.loadCharacters}> <FaPlus className="inline" /> Carregar Mais</button>
    );
}