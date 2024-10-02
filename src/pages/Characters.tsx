import { useState, useEffect } from "react";
import axios from "axios";
import Character from "../components/Character";
import ButtonCharacters from "../components/ButtonCharacters";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [offset , setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  
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

  const getCharacters = () => {
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

  const loadMoreCharacters = () =>{
    setOffset(offset + 20);
    getCharacters();
  }

  return (
    <div className="flex flex-column flex-wrap justify-center font-sofiasans ml-12">

      <div className="flex flex-row flex-wrap gap-4">

        {
          characters.length > 0 ? 
          characters.map((character) => <Character 
            key={character.id} 
            characterId={character.id} 
            urlImage={character.thumbnail.path + "." + character.thumbnail.extension} 
            imageDescription={character.description} 
            name={character.name} />) 
          : 
          <div>nothing</div>
        }

      </div>

      <div className="mt-6 mb-6 mr-12 ml-12">
        <ButtonCharacters loadCharacters={loadMoreCharacters} />
      </div>

    </div>
  )
}
