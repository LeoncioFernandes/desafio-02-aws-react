import { useState, useEffect } from "react";
import axios from "axios";
import Character from "../components/Character";
import ButtonCharacters from "../components/ButtonCharacters";
import { BiLoaderCircle } from "react-icons/bi";

interface Image{
  path: string,
  extension: string
}

interface Character{
  id: number,
  name: string,
  description: string,
  thumbnail: Image
}

export default function Characters() {
  const [limit, setLimit] = useState<number>(20);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [offset , setOffset] = useState<number>(0);
  const [load, setLoad] = useState<boolean | null>(true);
  
  
  const urlMarvelCharacters = "https://gateway.marvel.com/v1/public/characters";
  const publicKey = "493f684e0ee7ad7b3784da42ad63eee4";
  const paramsObject = {
    params: {
      apikey: publicKey,
      offset: offset,
      limit: limit
    }
  };

  useEffect(()=>{
    getCharacters();
  }, []);

  const getCharacters = async () => {
    setLoad(true);
    await axios.get(urlMarvelCharacters, paramsObject)
    .then(response => {
       console.log(response);
       console.log(response.data)
       console.log(response.data.data);
       console.log(response.data.data.results);
       setCharacters(response.data.data.results);
       setLoad(false);
    })
    .catch(error => {
      console.log(error)
      setLoad(null);
    });
  }

  const loadMoreCharacters = (): void =>{
    const newLimit: number = limit + 20;
    paramsObject.params.limit = newLimit;
    setLimit(newLimit);
    getCharacters();
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-16 p-6 sm:p-8">
      <div className="flex flex-row justify-center flex-wrap gap-6 sm:gap-8">

        {
          characters.length > 0 && 
          characters.map((character: Character) => <Character 
            key={character.id} 
            characterId={character.id} 
            urlImage={character.thumbnail.path + "." + character.thumbnail.extension} 
            imageDescription={character.description ? character.description : "Sem registro"} 
            name={character.name ? character.name : "Sem registro"} />) 
        }

      </div>

      {load ? (
        <div className="flex justify-center animate-spin">
          <BiLoaderCircle className="w-20 h-20 text-secondary" />
        </div> 
      ) : (
        <div className="flex justify-center">
        <ButtonCharacters loadCharacters={loadMoreCharacters} />
      </div>
      )}

      
    
    </div>
  )
}
