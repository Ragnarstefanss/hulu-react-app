import Image from "next/image";
import Head from "next/head";
import Header from "../../../components/Header"
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import Cast from "../../../components/Cast";
import SimilarItems from "../../../components/SimilarItems";
import ShowSimilarItems from "../../../components/helper/ShowSimilarItems";
import ShowCastMembers from "../../../components/helper/ShowCastMembers";
import ShowTvSeriesDetails from "../../../components/TV/ShowTvSeriesDetails";
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
            {/* <div className="sm:w-96 sm:mb-0 mb-6"> */}

              <img 
               src={ movie.poster_path ? `${BASE_URL}${movie.poster_path || movie.backdrop_path}` ||`${BASE_URL}${movie.poster_path}` : Logo}
              alt={movie.title} 
              className="w-1/4 h-1/4 rounded-lg shadow-lg" 
              />
            {/* </div> */}
            <div className="sm:ml-4 sm:mr-4">
              {/* <h2 className="text-6xl font-semibold text-white leading-tight mb-2">{movie.title}</h2>
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <svg className="fill-current text-orange-500 w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <span>{movie.vote_average}</span>
              </div>
              <p className="text-gray-300 text-base leading-relaxed mb-4">{movie.overview}</p>
              <div className="flex flex-wrap items-center text-gray-400 text-sm mb-4">
                {movie.genres && movie.genres.map(genre => (
                  <span key={genre.id} className="mr-4">{genre.name}</span>
                ))}
              </div> */}
            <ShowTvSeriesDetails tv={movie} />
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