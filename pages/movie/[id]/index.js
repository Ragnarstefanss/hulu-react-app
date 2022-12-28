import Image from "next/image";
import Head from "next/head";
import Header from "../../../components/Header"
import ShowSimilarItems from "../../../components/helper/ShowSimilarItems";
import ShowCastMembers from "../../../components/helper/ShowCastMembers";
import ShowContentsDetails from "../../../components/TV/ShowContentsDetails";
const Logo = require('../../../assets/no_image.jpg');

export default function Movie({ movie, characters, recommendation, similar }) {
  //console.log("hello", characters)
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  //{adult, gender, id, known_for_department, name, original_name, popularity, profile_path, cast_id, character, credit_id, order}
  const characters_cast = characters["cast"]
  //{adult, gender, id, known_for_department, name, original_name, popularity, profile_path, credit_id, department, job})
  const characters_crew = characters["crew"]
  
  return (
    <>
      <Header />
      <div className="p-4">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row">
            <img 
              src={ movie.poster_path ? `${BASE_URL}${movie.poster_path || movie.backdrop_path}` ||`${BASE_URL}${movie.poster_path}` : Logo}
              alt={movie.title} 
              className="w-1/4 h-1/4 rounded-lg shadow-lg" 
            />
            <div className="sm:ml-4 sm:mr-4">
              <ShowContentsDetails item={movie} />
              <ShowCastMembers type_name={"Cast"} items={characters_cast}/>
              <ShowSimilarItems type_name={"Recommendations"} items={recommendation} />
              <ShowSimilarItems type_name={"Similar"} items={similar}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps(context) {
  //query: { id: '436270' },
  //resolvedUrl: '/movie/436270',
  const resolvedUrl = context.resolvedUrl
  const movierequest = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());

  const similarmovierequest = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}/similar?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());
  
  const recommendationmovierequest = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}/recommendations?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());
  

  const charactersrequest = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}/credits?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());

  return {
    props: {
      movie: movierequest,
      characters: charactersrequest,
      recommendation: recommendationmovierequest,
      similar: similarmovierequest
    },
  };
}