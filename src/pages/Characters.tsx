import { useState, useEffect } from "react";
import axios from "axios";
import Character from "../components/Character";
import ButtonCharacters from "../components/ButtonCharacters";

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

  const getCharacters = (): void => {
    axios.get(urlMarvelCharacters, paramsObject)
    .then(response => {
       console.log(response);
       console.log(response.data)
       console.log(response.data.data);
       console.log(response.data.data.results);
       setCharacters(response.data.data.results);
    })
    .catch(error => console.log(error));
  }

  const loadMoreCharacters = (): void =>{
    const newLimit: number = limit + 20;
    paramsObject.params.limit = newLimit;
    setLimit(newLimit);
    getCharacters();
  }

  return (
    <div className="flex flex-column flex-wrap justify-center font-sofiasans ml-12">

      <div className="flex flex-row flex-wrap gap-4">

        {
          characters.length > 0 ? 
          characters.map((character: Character) => <Character 
            key={character.id} 
            characterId={character.id} 
            urlImage={character.thumbnail.path + "." + character.thumbnail.extension} 
            imageDescription={character.description ? character.description : "Sem registro"} 
            name={character.name ? character.name : "Sem registro"} />) 
          : 
          <div></div>
        }

      </div>

      <div className="mt-6 mb-6 mr-12 ml-12">
        <ButtonCharacters loadCharacters={loadMoreCharacters} />
      </div>

    </div>
  )
}
