import Image from "next/image"
import Head from "next/head";
import Header from "../../../components/Header"

export default function Movie({ results }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const id = results.id;
  const title = results.title;
  const adult  = results.adult;
  const backdrop_path = results.backdrop_path;
  const belongs_to_collection = results.belongs_to_collection;
  const budget = results.budget;
  const genres = results.genres;
  const homepage = results.homepage;
  const imdb_id = results.imdb_id;
  const original_language = results.original_language;
  const original_title = results.original_title;
  const overview = results.overview;
  const popularity = results.popularity;
  const poster_path = results.poster_path;
  const production_companies = results.production_companies;
  const production_countries = results.production_countries;
  const release_date = results.release_date;
  const revenue = results.revenue;
  const runtime = results.runtime;
  const spoken_languages = results.spoken_languages;
  const status = results.status;
  const tagline = results.tagline;
  const video = results.video;
  const vote_average = results.vote_average;
  const vote_count = results.vote_count;
  
  return (
    <>
      <Header />
      <h1>{title}</h1>
      <h3>{id}</h3>
      <Image
          layout="responsive"
          height={1080}
          width={1920}
          src={
              `${BASE_URL}${results.backdrop_path || results.poster_path}` ||
              `${BASE_URL}${results.poster_path}`
          }
          alt="images"
      />
      {//genres.map(genres => <div>{genres.name}</div>)
      }
    </>
  );
}

export async function getServerSideProps(context) {
  //query: { id: '436270' },
  //resolvedUrl: '/movie/436270',
  const resolvedUrl = context.resolvedUrl
  const request = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());
  return {
    props: {
      results: request,
    },
  };
}