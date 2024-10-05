import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { MdAddShoppingCart } from "react-icons/md";
import { useCart } from '../context/useShoppingCart';

interface Image{
  path: string,
  extension: string
}

interface Comics{
  id: number,
  thumbnail: Image,
  title: string,
  prices: [{
    price: number,
    type: string
  }]
  dates: [{
    date: string
  }],
  pageCount: number,
  creators: {
    items: [{
      name: string
    }]
  }
  series: {
    name: string
  }
}

interface Character{
  id: number,
  name: string,
  thumbnail: Image
}

interface MoreComics {
  id: number,
  title: string,
  thumbnail: Image
}

interface AddCart {
  id: number,
  title: string,
  urlImage: string,
  price: number,
}

export default function ComicsDetails() {
  
  const [comic, setComic] = useState<Comics[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [moreComics, setMoreComics] = useState<MoreComics[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [errorApi, setErroApi] = useState<boolean>(false);

  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const urlMarvelComics = `https://gateway.marvel.com/v1/public/comics/${id}`;
  const urlMarvelComicsCharacters = `https://gateway.marvel.com/v1/public/comics/${id}/characters`;
  const publicKey = "493f684e0ee7ad7b3784da42ad63eee4";
  const paramsObject = {
    params: {
      apikey: publicKey
    }
  };
  
  function FormatDate(date: string): string{
    const dt = new Date(date);
    return dt.getFullYear().toString();
  }

  const addToCart = useCart(state => state.addItem)

  useEffect(()=>{
    getComic();
    getCharacters();
  }, [id]);

  useEffect(() => {
    getMoreComics();
  }, [characters])

  const getComic = async () => {
    setLoad(true);
    await axios.get(urlMarvelComics, paramsObject)
    .then(response => {
      setComic(response.data.data.results);
    })
    .catch(() => {
      setErroApi(true);
    });
  }

  const getCharacters = async () => {
    await axios.get(urlMarvelComicsCharacters, paramsObject)
    .then(response => {
      setCharacters(response.data.data.results);
      setLoad(false);
      setErroApi(false);
    })
    .catch(() => {
      setLoad(false);
      setErroApi(true);
    })
  }

  const getMoreComics = async () => {
    if(characters.length > 0){
      const urlMarvelCharactersComics = `https://gateway.marvel.com/v1/public/characters/${characters[0].id}/comics`;
      await axios.get(urlMarvelCharactersComics, paramsObject)
      .then(response => {
        setMoreComics(response.data.data.results);
        setLoad(false);
        setErroApi(false);
      })
      .catch(() => {
        setLoad(false);
        setErroApi(true);
      })
    }
  }
  
  return (
    <div className='flex flex-col max-w-[788px] m-auto'>
      <NavLink
        className='flex items-center gap-2 font-extrabold text-2xl py-6 sm:py-8 p-3 sm:px-0'
        to={'/comics'}
      
      >
        <IoIosArrowBack className='text-secondary w-8 h-8' />
        Voltar
      </NavLink>
      {load ? <Loader/> : comic && (
        comic.map((cmic) => (
          <div key={cmic.id} className='flex flex-col gap-8 px-3'>
            <div className='flex flex-col items-center md:items-start md:flex-row w-full gap-4 sm:gap-12'>
              <div className='w-[280px] sm:w-[320px] sm:h-full overflow-hidden'>
                <img className='w-full h-full object-cover object-left-top' src={cmic.thumbnail.path + "." + cmic.thumbnail.extension} alt="" />
              </div>
              <div className='flex flex-col w-full sm:max-w-[389px]'>
                <div className='flex flex-col gap-2 font-extrabold pb-6 sm:pb-4'>
                  <h1 className='text-xl sm:text-2xl'>{cmic.title}</h1>
                  <p className='text-secondary text-base sm:text-xl'>$ {cmic.prices[0].price}</p>
                </div>
                <div className='flex justify-between sm:w-[389px] font-bold text-base pb-6 sm:pb-4'>
                  <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-1'>
                      <p className='text-gray-dark'>Publicado em</p>
                      <p>{FormatDate(cmic.dates[0].date)}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='text-gray-dark'>Autor</p>
                      <p>{cmic.creators.items[0].name}</p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-6 max-w-[161px]'>
                    <div className='flex flex-col gap-1'>
                      <p className='text-gray-dark'>Núm. de Páginas</p>
                      <p>{cmic.pageCount}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='text-gray-dark'>Série</p>
                      <p>{cmic.series.name}</p>
                    </div>
                  </div>
                </div>
                {characters.length != 0 && 
                  <div className='pb-4'>
                    <p className='text-gray-dark font-bold text-base pb-4'>Personagens da obra</p>
                    <div className='flex gap-6'>
                      {characters.map((character, index) => {
                        if(index > 2){
                          return
                        }
                        return(
                          <div key={character.id} className='flex flex-col gap-2 py-2'>
                            <NavLink to={`/characters/${character.id}`}>
                              <div className='w-20 h-[91px] overflow-hidden rounded-ss-3xl rounded-br-3xl'>
                                <img className='w-full h-full object-cover' src={character.thumbnail.path + "." + character.thumbnail.extension} alt="" />
                              </div>
                            </NavLink>
                            <p className='text-[8px] leading-[9.6px] font-bold w-20 uppercase'>{character.name}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                }
                
                <div className='flex flex-col-reverse sm:flex-row gap-4 w-full justify-between font-extrabold text-sm'>
                  <button
                    className='flex gap-1 items-center justify-center w-full px-4 py-2 border border-tertiary rounded-full hover:bg-tertiary hover:text-primary'
                    onClick={() => addToCart({
                      id: cmic.id.toString(),
                      title: cmic.title,
                      price: cmic.prices[0].price,
                      img: cmic.thumbnail.path + "." + cmic.thumbnail.extension
                    })}
                  >
                    <MdAddShoppingCart className='w-4 h-4' />
                    Adicionar ao carrinho
                  </button>
                  <button
                    className='w-full px-4 py-2 text-primary border border-transparent bg-secondary rounded-full hover:bg-primary hover:border-secondary hover:text-secondary'
                    onClick={() => {
                      addToCart({
                        id: cmic.id.toString(),
                        title: cmic.title,
                        price: cmic.prices[0].price,
                        img: cmic.thumbnail.path + "." + cmic.thumbnail.extension
                      })
                      navigate("/shopping-cart")
                    }}
                  >
                    Comprar agora
                  </button>
                </div>
              </div>
            </div>
            {characters.length != 0 &&
              <div>
                <p className='text-2xl font-bold pb-4'>Mais obras</p>
                <div className='flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-dark scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                  {moreComics.map((comic) => (
                    <div key={comic.id} className='flex flex-col gap-2 py-2 px-1 min-w-32 max-w-32'>
                      <NavLink
                        to={`/comics/${comic.id}`}
                      >
                        <div className='w-full h-[167px] overflow-hidden'>
                          <img className='w-full h-full object-cover' src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt="" />
                        </div>
                      </NavLink>
                      <p className='text-xs font-medium'>{comic.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
          </div>
        ))
      )}
      {(!load && !errorApi) && (
        <p className='text-xs font-medium text-center pt-14 pb-6'>&#169; Todos os direitos reservados a UOL Comics 2024</p>
      )}
      {errorApi && (
        <div className="text-center text-red-800 text-2xl">
          Erro ao buscar os dados! Recarregue a página.
        </div>
      )}
      
    </div>
  )
}
