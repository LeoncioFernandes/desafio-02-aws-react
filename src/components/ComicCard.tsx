type Comic = {
    title: string,
    price: string,
    author: string,
    year: number
}

export default function ComicCard({ title, price, author, year }: Comic) {
    return (
        <div className="group p-2 flex flex-col justify-center items-center hover:bg-secondary transition-colors hover:cursor-pointer w-80">
            <img src="http://i.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/portrait_xlarge.jpg" className='w-full' alt="comic-img" />
            <div className="text-start flex flex-col w-full">
                <span className="text-2xl font-medium group-hover:text-white">{title}</span>
                <span className='text-base font-bold text-secondary group-hover:text-blackText'>$ {price}</span>
                <div className="flex flex-row justify-between items-center font-medium group-hover:text-primary">
                    <span>{author}</span>
                    <span>{year}</span>
                </div>
            </div>
        </div>
    )
}
