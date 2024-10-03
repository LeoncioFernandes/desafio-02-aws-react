import { FaPlus } from 'react-icons/fa';

interface ButtonCharactersProps{
    loadCharacters: () => void;
}

export default function ButtonCharacters(props: ButtonCharactersProps){
    return (
        <button 
            className="pt-3 pb-3 pr-8 pl-8 text-gray-light bg-secondary rounded-full hover:shadow-3xl" 
            onClick={props.loadCharacters}> <FaPlus className="inline" /> Carregar Mais</button>
    );
}