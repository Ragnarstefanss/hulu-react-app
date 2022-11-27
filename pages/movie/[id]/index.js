import Image from "next/image"
import Head from "next/head";
import Header from "../../../components/Header"
import { HandThumbUpIcon } from "@heroicons/react/24/outline";

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
      <div className="p-2 group max-w-2xl">
          
          <Image
            layout="responsive"
            height={1080}
            width={1920}
            src={
                `${BASE_URL}${movie.backdrop_path || movie.poster_path}` ||
                `${BASE_URL}${movie.poster_path}`
            }
            alt="images"
        />
        <div className="p-2">
            <p className="max-w-2xl">{movie.overview}</p>
            <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
                {movie.title || movie.original_name}
            </h2>
            <p className="flex items-center opacity-0 group-hover:opacity-100">
                {movie.media_type && `${movie.media_type} •`}{" "}
                {movie.release_date || movie.first_air_date} •{" "}
                <HandThumbUpIcon className="h-5 mx-2" />
                {movie.svote_count}
            </p>


            {characters_cast.map((actor) => {
            return(
              <div key={actor.id}>
                <div>Actor name: {actor.name}</div>
                <div>Id: {actor.id}</div>
                <div>Popularity: {actor.popularity}</div>
                <div>Profile path: {actor.profile_path}</div>
                <div>Character: {actor.character}</div>
                <div>...</div>
              </div>
            )})}
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