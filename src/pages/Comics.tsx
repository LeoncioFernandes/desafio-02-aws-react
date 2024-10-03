import { useEffect, useState } from "react"
import ComicCard from "../components/ComicCard"
import instance from "../hooks/instance"
import { Link } from "react-router-dom"
import ButtonCharacters from "../components/ButtonCharacters"
import { BiLoaderCircle } from "react-icons/bi"

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
      setData(res.data.data.results)
    } catch (error) {
      console.log(error)
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
    <div className="w-full flex flex-col">
      <div className="flex flex-wrap justify-evenly my-8 px-14 sm:m-8 sm:px-28">
        {data.map(comic => (
          <Link key={comic.id}
            to={`/comics/${comic.id}`}>
            <ComicCard
              title={comic.title}
              price={comic.prices[0]?.price || 0}
              path={comic.thumbnail.path}
              extension={comic.thumbnail.extension}
              author={comic.creators.items[0]?.name || 'Unknown'}
              year={new Date(comic.modified).getFullYear().toString() || 'Unknown'}
            />
          </Link>
        ))}
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
