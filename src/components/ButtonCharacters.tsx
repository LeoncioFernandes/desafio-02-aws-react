import { FaPlus } from 'react-icons/fa';

interface ButtonCharactersProps{
    loadCharacters: () => void;
}

export default function ButtonCharacters(props: ButtonCharactersProps){
    return (
        <button 
            className="flex gap-1 items-center py-3.5 px-4 mb-8 text-primary text-base font-medium bg-secondary rounded-full border-[1px] hover:text-secondary hover:bg-primary hover:border-secondary" 
            onClick={props.loadCharacters}> <FaPlus className="w-3.5 h-3.5" />Carregar mais</button>
    );
}