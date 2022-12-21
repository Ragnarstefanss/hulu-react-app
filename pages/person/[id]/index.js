import Image from "next/image";
import Head from "next/head";
import Header from "../../../components/Header"
import Results from "../../../components/Results";
import PersonThumbnailMovies from "../../../components/PersonThumbnailMovies";
import FlipMove from "react-flip-move";

export default function Person({ person, popular }) {
  //console.log("hello", characters)
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  return (    
   <>
      <Header />
      <div className="p-4">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row">
            {/* <div className="sm:w-96 sm:mb-0 mb-6"> */}
              <img src={`${BASE_URL}${person.profile_path}`} alt={person.name} class="w-1/4 h-1/4"/>
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

              <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-5">
                {popular && popular["cast"].map((member) => (
                    
                    <PersonThumbnailMovies key={member.id} result={member}/>
                ))}
            </FlipMove>
             
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

const moviecredits_request = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}/movie_credits?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());
  
  return {
    props: {
      person: actor_request,
      popular: moviecredits_request,
    },
  };
}
