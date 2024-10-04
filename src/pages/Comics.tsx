import { useEffect, useState } from "react"
import ComicCard from "../components/ComicCard"
import instance from "../hooks/instance"
import { NavLink } from "react-router-dom"
import ButtonCharacters from "../components/ButtonCharacters"
import Loader from "../components/Loader"

type Comic = {
  id: number,
  title: string,
  thumbnail: {
    path: string,
    extension: string,
  },
  prices: [
    {
      price: number
    }
  ]
  creators: {
    items: [
      {
        name: string,
      }
    ]
  },
  modified: string
}

export default function Comics() {
  const [data, setData] = useState<Comic[]>([])
  const [offset, setOffset] = useState<number>(0);
  const [load, setLoad] = useState<boolean>(true);
  const [errorApi, setErroApi] = useState<boolean>(false);

  const publicKey = "493f684e0ee7ad7b3784da42ad63eee4";
  const paramsObject = {
    params: {
      apikey: publicKey,
      offset: offset,
      limit: 20,
      orderBy: '-issueNumber'
    }
  };

  const fetchData = async () => {
    setLoad(true)
    try {
      const res = await instance.get("comics", paramsObject)
      const newComics: Comic[] = [...data, ...res.data.data.results]
      setData(newComics)
      setErroApi(false);
    } catch (error) {
      setErroApi(true);
      console.log(error)
      if(offset > 0){
        const newOfsset: number = offset - 20;
        paramsObject.params.offset = newOfsset;
        setOffset(newOfsset);
      }
    } finally {
      setLoad(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const loadMoreCharacters = (): void => {
    const newOfsset: number = offset + 20;
    paramsObject.params.offset = newOfsset;
    setOffset(newOfsset);
    fetchData()
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-16 p-6 sm:p-8">
      <div className="flex flex-row justify-center flex-wrap gap-6 sm:gap-16">
        {data.map(comic => (
          <NavLink key={comic.id}
            to={`/comics/${comic.id}`}>
            <ComicCard
              title={comic.title}
              price={comic.prices[0]?.price || 0}
              path={comic.thumbnail.path}
              extension={comic.thumbnail.extension}
              author={comic.creators.items[0]?.name || 'Unknown'}
              year={new Date(comic.modified).getFullYear().toString() || 'Unknown'}
            />
          </NavLink>
        ))}
      </div>
      {load ? (
        <Loader/>
      ) : (
        <div className="flex justify-center">
          <ButtonCharacters loadCharacters={loadMoreCharacters} />
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
