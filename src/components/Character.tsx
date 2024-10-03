
interface CharactersProps {
    characterId: number,
    urlImage: string,
    imageDescription: string,
    name: string
}

export default function Character(props: CharactersProps){

    const handleBgColorOn = ()=>{
         const elem = document.getElementById(`bottom-character-bg-${props.characterId}`);
         if(elem){
            elem.classList.remove("bg-tertiary");
            elem.classList.add("bg-secondary");
         }
        
    }

    const handleBgColorOff = ()=>{
        const elem = document.getElementById(`bottom-character-bg-${props.characterId}`);
        if(elem){
           elem.classList.remove("bg-secondary");
           elem.classList.add("bg-tertiary");
        }
       
   }

    return (
        <div 
            className="hover:bg-secondary">

            <img 
                className="w-64 h-72" 
                src={props.urlImage} 
                alt={props.imageDescription} 
                onMouseOver={handleBgColorOn}
                onMouseOut={handleBgColorOff}/>

            <hr 
                className="bg-secondary h-2 w-64" 
                onMouseOver={handleBgColorOn} 
                onMouseOut={handleBgColorOff}/>

            <div 
                id={`bottom-character-bg-${props.characterId}`} 
                className="w-64 h-28 bg-tertiary rounded-br-3xl hover:bg-secondary">
                    
                <h4 className="text-gray-light pt-3 pl-3">{props.name}</h4>
            </div>
        </div>
    );
}