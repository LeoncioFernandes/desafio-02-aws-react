import { NavLink } from "react-router-dom";

interface CharactersProps {
    characterId: number,
    urlImage: string,
    imageDescription: string,
    name: string
}

export default function Character(props: CharactersProps){

  //   const handleBgColorOn = ()=>{
  //        const elem = document.getElementById(`bottom-character-bg-${props.characterId}`);
  //        if(elem){
  //           elem.classList.remove("bg-tertiary");
  //           elem.classList.add("bg-secondary");
  //        }
        
  //   }

  //   const handleBgColorOff = ()=>{
  //       const elem = document.getElementById(`bottom-character-bg-${props.characterId}`);
  //       if(elem){
  //          elem.classList.remove("bg-secondary");
  //          elem.classList.add("bg-tertiary");
  //       }
       
  //  }

    return (
      <NavLink to={`/characters/${props.characterId}`}>
        <div 
            // className="hover:bg-secondary"
            className="group"
            >
            <div className="w-48 sm:w-56 h-56 sm:h-64 ">
              <img 
                  className="w-full h-full object-cover object-left-top" 
                  src={props.urlImage} 
                  alt={props.imageDescription} 
                  // onMouseOver={handleBgColorOn}
                  // onMouseOut={handleBgColorOff}
                  />

            </div>
            
            <div 
                className="bg-secondary h-1.5 w-48 sm:w-56" 
                // onMouseOver={handleBgColorOn} 
                // onMouseOut={handleBgColorOff}
                />

            <div 
                // id={`bottom-character-bg-${props.characterId}`} 
                className="relative w-48 sm:w-56 h-32 sm:h-36 p-4 bg-tertiary group-hover:bg-secondary transition duration-200">
                    
                <h1 className="text-primary text-2xl sm:text-3xl font-bold uppercase">{props.name}</h1>
                <div className="absolute -bottom-[1px] -right-[1px] bg-white w-5 h-10 clip-path-triangle"></div>
            </div>
        </div>
      </NavLink>
    );
}