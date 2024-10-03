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
        <div className="group p-2 flex flex-col justify-between items-start mb-6 hover:bg-secondary transition-colors hover:cursor-pointer sm:w-80 w-60">
            <img src={`${path}.${extension}`} className='w-full shadow-xl' alt="comic-img" />
            <div className="text-start flex flex-col w-full">
                <span className="text-base sm:text-2xl font-medium group-hover:text-white">{title}</span>
                <span className='text-base font-bold text-secondary group-hover:text-blackText'>$ {price}</span>
                <div className="sm:text-base text-xs flex flex-row justify-between items-center font-medium group-hover:text-primary">
                    <span>{author}</span>
                    <span>{year}</span>
                </div>
            </div>
        </div>
    )
}
