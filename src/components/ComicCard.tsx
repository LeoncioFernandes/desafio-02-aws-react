type Comic = {
    title: string,
    price: number,
    author: string,
    extension: string,
    path: string,
    year: string
}

export default function ComicCard({ title, path, extension, price, author, year }: Comic) {
    return (
        <div className="group p-2 flex flex-col justify-between items-start hover:bg-secondary transition duration-200 hover:cursor-pointer w-64 sm:w-[340px] min-h-[425px] sm:min-h-[557px] gap-2 rounded-[4px]">
          <div className="w-full h-[333px] sm:h-[450px]">
            <img src={`${path}.${extension}`} className='w-full h-full object-cover object-left-top drop-shadow-xl' alt="comic-img" />
          </div>
          <div className="text-start flex flex-col w-full h-full gap-2">
            <span className="text-base sm:text-2xl font-medium group-hover:text-white">{title}</span>
            <span className='text-base font-bold text-secondary group-hover:text-blackText'>$ {price}</span>
            <div className="text-xs sm:text-base flex flex-row justify-between items-center font-medium group-hover:text-primary">
                <span>{author}</span>
                <span>{year}</span>
            </div>
          </div>
      </div>
    )
}
