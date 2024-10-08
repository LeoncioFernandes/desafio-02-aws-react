import { useEffect, useState } from "react"
import ComicCard from "../components/ComicCard"
import instance from "../hooks/instance"
import { NavLink } from "react-router-dom"
import ButtonCharacters from "../components/ButtonCharacters"
import Loader from "../components/Loader"
import { useSearchItem } from "../context/useSearchItem"

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
  dates: [{
    date: string
  }]
}

export default function Comics() {
  
  const [data, setData] = useState<Comic[]>([])
  const [offset, setOffset] = useState<number>(0);
  const [load, setLoad] = useState<boolean>(true);
  const [errorApi, setErroApi] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const { searchTerm } = useSearchItem()
  const publicKey = "493f684e0ee7ad7b3784da42ad63eee4";
  const paramsObject = {
    params: {
      apikey: publicKey,
      offset: offset,
      limit: 20,
      orderBy: 'title',
      ...(searchTerm && searchTerm !== '' && { titleStartsWith: searchTerm })
    }
  };


  const fetchData = async () => {
    let ct = count
    setLoad(true)
    if (searchTerm) {
      if(searchTerm.length <= 3){
        return
      }
      setData([])
      setOffset(0)
      setCount(count + 1)
      ct++;
    } else {
      if (count > 0) {
        setData([])
        setOffset(0)
        setCount(-1)
        ct = -1
      }
    }
    try {
      const res = await instance.get("comics", paramsObject)
      const newComics: Comic[] = res.data.data.results
      setData(() => {
        if (ct == 0) {
          return [...data, ...newComics]
        }
        if (ct == -1) {
          setCount(0);
          return newComics
        }
        return newComics
      })
      setErroApi(false);
    } catch (error) {
      setErroApi(true);
      console.log(error)
      if (offset > 0) {
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
  }, [searchTerm, offset])

  const loadMoreCharacters = (): void => {
    const newOfsset: number = offset + 20;
    paramsObject.params.offset = newOfsset;
    setOffset(newOfsset);
    fetchData()
  }

  const generatePrice = (): number => {
    return parseFloat((Math.random() + 10).toFixed(2))
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-16 p-6 sm:p-8">
      <div className="flex flex-row justify-center flex-wrap gap-6 sm:gap-16">
        {data.map(comic => (
          <NavLink key={comic.id}
            to={`/comics/${comic.id}`}>
            <ComicCard
              title={comic.title}
              price={comic.prices[0].price || generatePrice()}
              path={comic.thumbnail.path}
              extension={comic.thumbnail.extension}
              author={comic.creators.items[0]?.name || 'Sem registro'}
              year={new Date(comic.dates[0].date).getFullYear().toString() || 'Sem registro'}
            />
          </NavLink>
        ))}
      </div>

      {load && (
        <Loader />
      )}

      {(data.length >= 20 && !searchTerm) && (
        <div className="flex justify-center">
          <ButtonCharacters loadCharacters={loadMoreCharacters} />
        </div>
      )}

      {data.length == 0 && !load && (
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
