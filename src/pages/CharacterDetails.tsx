import { NavLink, useParams } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';

interface Image{
  path: string,
  extension: string
}

interface StoriesSeries{
  available: number
}

interface Character{
  id: number,
  modified: string,
  name: string,
  description: string,
  thumbnail: Image
  series: StoriesSeries,
  stories: StoriesSeries
}

interface Comics{
  id: number,
  title: string,
  thumbnail: Image
}

export default function CharacterDetails() {

  const [character, setCharacter] = useState<Character[]>([]);
  const [comics, setComics] = useState<Comics[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [errorApi, setErroApi] = useState<boolean>(false);

  function FormatDate(date: string): string{
    const dt = new Date(date);
    return dt.getFullYear().toString();
  }

  useEffect(()=>{
    getCharacters();
    getComics();
  }, []);

  const {id} = useParams<{id: string}>();

  const urlMarvelCharacters = `https://gateway.marvel.com/v1/public/characters/${id}`;
  const urlMarvelCharactersComics = `https://gateway.marvel.com/v1/public/characters/${id}/comics`;
  const publicKey = "493f684e0ee7ad7b3784da42ad63eee4";
  const paramsObject = {
    params: {
      apikey: publicKey
    }
  };

  const getCharacters = async () => {
    await axios.get(urlMarvelCharacters, paramsObject)
    .then(response => {
      setCharacter(response.data.data.results);
    })
    .catch(() => {
      setErroApi(true);
    });
  }

  const getComics = async () => {
    await axios.get(urlMarvelCharactersComics, paramsObject)
    .then(response => {
      setComics(response.data.data.results);
      setLoad(false);
      setErroApi(false);
    })
    .catch(() => {
      setLoad(false);
      setErroApi(true);
    })
  }
  
  return (
    <div className='flex flex-col max-w-[788px] m-auto'>
      <NavLink
        className='flex items-center gap-2 font-extrabold text-2xl py-6 sm:py-8 p-3 sm:px-0'
        to={'/characters'}
      
      >
        <IoIosArrowBack className='text-secondary w-8 h-8' />
        Voltar
      </NavLink>
      {load ? <Loader/> : character && (
        character.map((charac) => (
          <div key={charac.id} className='flex flex-col gap-8 px-3'>
            <div className='flex flex-col items-center md:items-start md:flex-row w-full gap-4 sm:gap-12'>
              <div className='w-[280px] sm:w-[300px] h-[403px] sm:h-[432px] rounded-ss-[55px] rounded-ee-[55px] overflow-hidden'>
                <img className='w-full h-full object-cover' src={charac.thumbnail.path + "." + charac.thumbnail.extension} alt="" />
              </div>
              <div className='flex flex-col max-w-[389px]'>
                <h1 className='font-extrabold text-xl sm:text-2xl text-center sm:text-start uppercase pb-6'>{charac.name}</h1>
                <div className='flex justify-between font-bold text-base pb-4'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-gray-dark'>Criado em</p>
                    <p>{FormatDate(charac.modified)}</p>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p className='text-gray-dark'>Histórias</p>
                    <p>{charac.stories.available}</p>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p className='text-gray-dark'>Núm. de séries</p>
                    <p>{charac.series.available}</p>
                  </div>
                </div>
                <div className='flex flex-col text-base gap-1 pb-6'>
                  <p className='text-gray-dark font-bold '>Descrição</p>
                  <p className='text-pretty font-medium'>{charac.description != "" ? charac.description : "Sem registro"}</p>
                </div>
                <div>
                  <p className='text-gray-dark font-bold text-base pb-4'>Histórias</p>
                  <div className='flex gap-4'>
                    {comics.map((comic, index) => {
                      if(index > 2){
                        return
                      }
                      return(
                        <div key={comic.id} className='flex flex-col gap-2 p-2'>
                          <NavLink to={`/comics/${comic.id}`}>
                            <div className='w-20 h-28 overflow-hidden'>
                              <img className='w-full h-full object-cover object-left-top' src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt="" />
                            </div>
                          </NavLink>
                          <p className='text-[8px] leading-[9.6px] font-medium w-20'>{comic.title}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className='text-2xl font-bold pb-4'>Mais obras</p>
              <div className='flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-dark scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                {comics.map((comic) => (
                  <div key={comic.id} className='flex flex-col gap-2 py-2 px-1 min-w-32 max-w-32'>
                    <NavLink to={`/comics/${comic.id}`}>
                      <div className='w-full h-[167px] overflow-hidden'>
                        <img className='w-full h-full object-cover' src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt="" />
                      </div>
                    </NavLink>
                    <p className='text-xs font-medium'>{comic.title}</p>
                  </div>
                ))}
              </div>
            </div>
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
