import { useState, useEffect } from "react";
import Character from "../components/Character";
import ButtonCharacters from "../components/ButtonCharacters";
import Loader from "../components/Loader";
import { useSearchItem } from "../context/useSearchItem";
import instance from "../hooks/instance";

interface Image {
  path: string,
  extension: string
}

interface Character {
  id: number,
  name: string,
  description: string,
  thumbnail: Image
}

export default function Characters() {
  // const [limit, setLimit] = useState<number>(20);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [load, setLoad] = useState<boolean>(true);
  const [errorApi, setErroApi] = useState<boolean>(false);

  const publicKey = "493f684e0ee7ad7b3784da42ad63eee4";
  const { searchTerm } = useSearchItem()
  const paramsObject = {
    params: {
      apikey: publicKey,
      offset: offset,
      limit: 20,
      ...(searchTerm && searchTerm !== "" && { nameStartsWith: searchTerm }) //caso haja um valor e esse valor seja diferente de uma string vazia, um novo parâmetro será adicionado
    }
  };

  useEffect(() => {
    getCharacters();
  }, [searchTerm, offset]);

  const getCharacters = async () => {
    setLoad(true);

    if (offset === 0) {
      setCharacters([])
    }

    await instance.get("characters", paramsObject)
      .then(response => {
        const newCharacters: Character[] = response.data.data.results
        setCharacters(prevCharacters => {
          return (
            offset > 0 && !searchTerm ? [...prevCharacters, ...newCharacters] : newCharacters
          )
        });
        setLoad(false);
        setErroApi(false);
      })
      .catch(() => {
        // console.log(error)
        setLoad(false);
        setErroApi(true);
        if (offset > 0) {
          const newOfsset: number = offset - 20;
          paramsObject.params.offset = newOfsset;
          setOffset(newOfsset);
        }
      })
  }

  const loadMoreCharacters = (): void => {
    const newOfsset: number = offset + 20;
    paramsObject.params.offset = newOfsset;
    setOffset(newOfsset);
    getCharacters();
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-16 p-6 sm:p-8">
      <div className="flex flex-row justify-center flex-wrap gap-6 sm:gap-8">

        {
          characters.length > 0 &&
          characters.map((character: Character) => <Character
            characterId={character.id}
            urlImage={character.thumbnail.path + "." + character.thumbnail.extension}
            imageDescription={character.description ? character.description : "Sem registro"}
            name={character.name ? character.name : "Sem registro"} />)
        }

      </div>

      {load && (
        <Loader />
      )}

      {(characters.length >= 20 && !searchTerm) && (
        <div className="flex justify-center">
          <ButtonCharacters loadCharacters={loadMoreCharacters} />
        </div>
      )}

      {characters.length == 0 && !load && (
        <div className="w-full">
          <h1 className="text-center text-2xl">Nenhum personagem foi encontrado :(</h1>
        </div>
      )}

      {errorApi && (
        <div className="text-center text-red-800 text-2xl">
          Erro ao buscar os dados! Recarregue a página.
        </div>
      )}



    </div>
  )
}
