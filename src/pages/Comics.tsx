import ComicCard from "../components/ComicCard"

export default function Comics() {
  return (
    <div className="flex flex-wrap justify-evenly m-8 px-28">
      <ComicCard title="The Amazing Spider Man #18" price="34,90" author="William, Turg" year={2023}/>
    </div>
  )
}
