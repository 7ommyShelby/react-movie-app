import Popular from "./Popular"
import Rated from "./Rated"
import Trending from "./Trending"
import './movie.css'

const Home = () => {


  return (
    <>
      <main className="flex items-center flex-col gap-4">

        <Trending />
        <Popular />
        <Rated />

      </main>
    </>
  )
}

export default Home
