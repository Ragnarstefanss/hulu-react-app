import Image from "next/image"
import Head from "next/head";
import Header from "../../../components/Header"
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import Cast from "../../../components/Cast";
const Logo = require('../../../assets/no_image.jpg');

export default function Movie({ movie, characters }) {
  //console.log("hello", characters)
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const id = movie.id;
  const title = movie.title;
  const adult  = movie.adult;
  const backdrop_path = movie.backdrop_path;
  const belongs_to_collection = movie.belongs_to_collection;
  const budget = movie.budget;
  const genres = movie.genres;
  const homepage = movie.homepage;
  const imdb_id = movie.imdb_id;
  const original_language = movie.original_language;
  const original_title = movie.original_title;
  const overview = movie.overview;
  const popularity = movie.popularity;
  const poster_path = movie.poster_path;
  const production_companies = movie.production_companies;
  const production_countries = movie.production_countries;
  const release_date = movie.release_date;
  const revenue = movie.revenue;
  const runtime = movie.runtime;
  const spoken_languages = movie.spoken_languages;
  const status = movie.status;
  const tagline = movie.tagline;
  const video = movie.video;
  const vote_average = movie.vote_average;
  const vote_count = movie.vote_count;

  const characters_id = characters["id"]
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
              <h2 className="text-6xl font-semibold text-white leading-tight mb-2">{movie.title}</h2>
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <svg className="fill-current text-orange-500 w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <span>{movie.vote_average}</span>
              </div>
              <p className="text-gray-300 text-base leading-relaxed mb-4">{movie.overview}</p>
              <div className="flex flex-wrap items-center text-gray-400 text-sm mb-4">
                {movie.genres && movie.genres.map(genre => (
                  <span key={genre.id} className="mr-4">{genre.name}</span>
                ))}
              </div>
              <div className="flex flex-wrap space-y-4">
                <h2 className="text-2xl font-semibold text-white leading-tight mb-2">Cast</h2>
              </div>
              <div className="flex flex-wrap">
                {characters_cast && characters_cast.slice(0, 12).map((member) => (
                  <Cast key={member.id} member={member}/>
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
  //resolvedUrl: '/movie/436270',
  const resolvedUrl = context.resolvedUrl
  const movierequest = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());
  
  const charactersrequest = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}/credits?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());

  return {
    props: {
      movie: movierequest,
      characters: charactersrequest
    },
  };
}

    //  <div className="p-4">
    //     <div className="container mx-auto px-4 py-16">
    //       <div className="flex flex-col sm:flex-row">
    //         <div className="sm:w-110 sm:mb-0 mb-6">
    //           <img src={`${BASE_URL}${movie.backdrop_path || movie.poster_path}` || `${BASE_URL}${movie.poster_path}`} alt={movie.title} className="w-full rounded-lg shadow-lg" />
    //         </div>
    //         <div className="sm:ml-4 sm:mr-4">
    //           <h2 className="text-4xl font-semibold text-white leading-tight mb-2">{movie.title}</h2>
    //           <div className="flex items-center text-gray-400 text-sm mb-4">
    //             <svg className="fill-current text-orange-500 w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    //             <span>{movie.vote_average}</span>
    //           </div>
    //           <p className="text-gray-300 text-base leading-relaxed mb-4">{movie.overview}</p>
    //           <div className="flex flex-wrap items-center text-gray-400 text-sm mb-4">
    //             {movie.genres.map(genre => (
    //               <span key={genre.id} className="mr-4">{genre.name}</span>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="flex flex-wrap">
    //         <h2 className="text-4xl font-semibold text-white leading-tight mb-2">Cast</h2>
    //         {characters_cast.slice(0, 12).map((member) => (
    //           <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 p-4" key={member.id}>
    //             <img src={`${BASE_URL}${member.profile_path}`} alt={member.name} className="w-full h-48 object-cover rounded-lg" />
    //             <h2 className="text-lg font-bold mt-2">{member.name}</h2>
    //             <p className="text-sm text-gray-600">{member.character}</p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    // </div>

    //   <div className="p-2 group max-w-2xl">
          
    //       <Image
    //         layout="responsive"
    //         height={1080}
    //         width={1920}
    //         src={
    //             `${BASE_URL}${movie.backdrop_path || movie.poster_path}` ||
    //             `${BASE_URL}${movie.poster_path}`
    //         }
    //         alt="images"
    //     />
    //     <div className="p-2">
    //         <p className="max-w-2xl">{movie.overview}</p>
    //         <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
    //             {movie.title || movie.original_name}
    //         </h2>
    //         <p className="flex items-center opacity-0 group-hover:opacity-100">
    //             {movie.media_type && `${movie.media_type} •`}{" "}
    //             {movie.release_date || movie.first_air_date} •{" "}
    //             <HandThumbUpIcon className="h-5 mx-2" />
    //             {movie.svote_count}
    //         </p>


    //         {characters["cast"]?.map((actor) => {
    //         return(
    //           <div key={actor.id}>
    //             <div>Actor name: {actor.name}</div>
    //             <div>Id: {actor.id}</div>
    //             <div>Popularity: {actor.popularity}</div>
    //             <div>Profile path: {actor.profile_path}</div>
    //             <div>Character: {actor.character}</div>
    //             <div>...</div>
    //           </div>
    //         )})}
    //     </div>
    // </div>