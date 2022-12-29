import Image from "next/image";
import Head from "next/head";
import Header from "../../../components/Header"
import Results from "../../../components/Results";
import PersonThumbnailMovies from "../../../components/PersonThumbnailMovies";
import FlipMove from "react-flip-move";
import PropTypes from 'prop-types';
import {useState} from 'react';

  function getUnique(arr, comp) {
     // store the comparison  values in array
    const unique =  arr.map(e => e[comp])
                    // store the indexes of the unique objects
                    .map((e, i, final) => final.indexOf(e) === i && i)
                    // eliminate the false indexes & return unique objects
                  .filter((e) => arr[e]).map(e => arr[e]);
    return unique;
  }

export default function Person({ person, popular, tv_shows }) {
  //console.log("hello", characters)
  const sort_movie_popularity = getUnique(popular["cast"].sort((a, b) => b.popularity - a.popularity),'id')
  const sort_tv_popularity = getUnique(tv_shows["cast"].sort((a, b) => b.popularity - a.popularity),'id');

  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  
  const [movie_expanded, movie_setExpanded] = useState(false)
  const movie_dataForDisplay = movie_expanded ? sort_movie_popularity : sort_movie_popularity.slice(0, 12)
  
  const [tv_expanded, tv_setExpanded] = useState(false)
  const tv_dataForDisplay = tv_expanded ? sort_tv_popularity : sort_tv_popularity.slice(0, 12)
  
  return (    
   <>
      <Header />
      <div className="p-4">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row">
            {/* <div className="sm:w-96 sm:mb-0 mb-6"> */}      
            <Image width={300} height={300} src={ person.profile_path ? `${BASE_URL}${person.profile_path || person.backdrop_path}` ||`${BASE_URL}${person.profile_path}` : require('../../../assets/no_image.jpg')} alt={person.name} className="w-1/4 h-1/4"/>
            {/* //   className="w-full rounded-lg shadow-lg" /> */}
            {/* </div> */}
            <div className="sm:ml-4 sm:mr-4">
              <h2 className="text-4xl font-semibold text-white leading-tight mb-2">{person.name}</h2>
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <svg className="fill-current text-orange-500 w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <span>{person.popularity}</span>
              </div>
              <p className="text-gray-300 text-base leading-relaxed mb-4">{person.biography}</p>
             {/* here */}

            {/* Popular Tv */}
            <div className="flex flex-wrap space-y-4">
                <h1 className="text-2xl font-semibold text-white leading-tight mb-2">Popular TV</h1>
            </div>
              <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-5">
                {tv_dataForDisplay.map((member) => ( 
                    <PersonThumbnailMovies key={member.id} result={member} media_type={'tv'}/>
                ))}
            </FlipMove>
             <div className="flex justify-center items-center">
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => tv_setExpanded(!tv_expanded)}>
                    {tv_expanded ? 'Show Less' : 'Show More'} 
                  </button>
              </div>

            {/* Popular Movies */}
            <div className="flex flex-wrap space-y-4">
                <h1 className="text-2xl font-semibold text-white leading-tight mb-2">Popular Movies</h1>
            </div>
              <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-5">
                {movie_dataForDisplay.map((member) => ( 
                    <PersonThumbnailMovies key={member.id} result={member}/>
                ))}
            </FlipMove>
             <div className="flex justify-center items-center">
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => movie_setExpanded(!movie_expanded)}>
                    {movie_expanded ? 'Show Less' : 'Show More'} 
                  </button>
              </div>
                    
            </div>
            </div>
          </div>
        </div>
    </>
  );
};



export async function getServerSideProps(context) {
  //query: { id: '436270' },
  //resolvedUrl: '/movie/436270',
  const resolvedUrl = context.resolvedUrl
  const actor_request = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());

const movie_credits_request = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}/movie_credits?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());

  const tv_credits_request = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}/tv_credits?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());
  
  return {
    props: {
      person: actor_request,
      popular: movie_credits_request,
      tv_shows: tv_credits_request
    },
  };
}

