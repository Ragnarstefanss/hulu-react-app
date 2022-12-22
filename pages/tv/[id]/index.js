import Image from "next/image";
import Head from "next/head";
import Header from "../../../components/Header"
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import Cast from "../../../components/Cast";

import SimilarItems from "../../../components/SimilarItems";
import Thumbnail from "../../../components/Thumbnail";
import ShowSeason from "../../../components/TV/ShowSeason";
const Logo = require('../../../assets/no_image.jpg');
import FlipMove from "react-flip-move";



export default function Tv({ tv, season, characters, recommendation, similar  }) {
  //console.log("hello", characters)
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  //{adult, gender, id, known_for_department, name, original_name, popularity, profile_path, cast_id, character, credit_id, order}
  const characters_cast = characters["cast"]
  //{adult, gender, id, known_for_department, name, original_name, popularity, profile_path, credit_id, department, job})
  console.log(tv.seasons)
  const seasons = tv["seasons"]
  return (
    <>
      <Header />
      <div className="p-4">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row">
            {/* <div className="sm:w-96 sm:mb-0 mb-6"> */}

              <img 
               src={ tv.poster_path ? `${BASE_URL}${tv.poster_path || tv.backdrop_path}` ||`${BASE_URL}${tv.poster_path}` : Logo}
              alt={tv.name} 
              className="w-1/4 h-1/4 rounded-lg shadow-lg" 
              />
            {/* </div> */}
            <div className="sm:ml-4 sm:mr-4">
              <h1 className="text-6xl font-semibold text-white leading-tight mb-2">{tv.name}</h1>
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <svg className="fill-current text-orange-500 w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h14v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <span>{tv.vote_average}</span>
              </div>
              <p className="text-gray-300 text-base leading-relaxed mb-4">{tv.overview}</p>
              <div className="flex flex-wrap items-center text-gray-400 text-sm mb-4">
                {tv.genres && tv.genres.map(genre => (
                  <span key={genre.id} className="mr-4">{genre.name}</span>
                ))}
              </div>
              
              
              <div className="flex flex-wrap space-y-4">
                <h1 className="text-2xl font-semibold text-white leading-tight mb-2">{seasons.map((member) => (member.name))}</h1>
              </div>
              <FlipMove className="my-5 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-5">
                {season.episodes.map((result) => (
                    <ShowSeason key={result.id} episode={result}/>
                ))}
              </FlipMove>



              <div className="flex flex-wrap space-y-4">
                <h1 className="text-2xl font-semibold text-white leading-tight mb-2">Cast</h1>
              </div>
              <div className="flex flex-wrap my-5">
                {characters_cast && characters_cast.slice(0, 12).map((member) => (
                  <Cast key={member.id} member={member}/>
                ))}
            </div>
            <div className="flex flex-wrap space-y-4">
                <h1 className="text-2xl font-semibold text-white leading-tight mb-2">Recommendation</h1>
            </div>
            <div className="flex flex-wrap my-5">
                {recommendation && recommendation["results"].slice(0, 6).map((recommendation) => (
                  <SimilarItems key={recommendation.id} similar={recommendation}/>
                ))}
            </div>
            <div className="flex flex-wrap space-y-4">
                <h1 className="text-2xl font-semibold text-white leading-tight mb-2">Similar</h1>
            </div>
            <div className="flex flex-wrap my-5">
                {similar && similar["results"].slice(0, 6).map((similar) => (
                  <SimilarItems key={similar.id} similar={similar}/>
                ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps(context) {
  //query: { id: '436270' },
  //resolvedUrl: '/tv/436270',
  const resolvedUrl = context.resolvedUrl
  const season = context.query.season ? context.query.season : 1;

  const tvrequest = await fetch(
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

  const seasonrequest = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}/season/${season}?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());

  return {
    props: {
      tv: tvrequest,
      season: seasonrequest,
      characters: charactersrequest,
      recommendation: recommendationmovierequest,
      similar: similarmovierequest
    },
  };
}
