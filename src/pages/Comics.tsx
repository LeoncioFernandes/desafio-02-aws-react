import { useEffect, useState } from "react"
import ComicCard from "../components/ComicCard"
import instance from "../hooks/instance"
import { Link } from "react-router-dom"
import { key } from "../api/api"

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
  dates: [
    {
      date: string
    },
  ],
}

export default function Comics() {
  const [data, setData] = useState<Comic[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`comics?orderBy=title&limit=20&${key}`)
        setData(res.data.data.results)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    console.log(data)
  }, [])

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-wrap justify-evenly my-8 px-14 sm:m-8 sm:px-28">
        {data.map(comic => (
          <Link to={`/comics/${comic.id}`}>
            <ComicCard
              key={comic.id}
              title={comic.title}
              price={comic.prices[0]?.price || 0}
              path={comic.thumbnail.path}
              extension={comic.thumbnail.extension}
              author={comic.creators.items[0]?.name || 'Unknown'}
              year={new Date(comic.dates[0]?.date).getFullYear().toString() || 'Unknown'}
            />
          </Link>
        ))}
      </div>
      <button>Carregar mais</button>
    </div>
  )
}
