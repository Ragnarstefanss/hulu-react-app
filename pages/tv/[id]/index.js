import Image from "next/image";
import Header from "../../../components/Header"
import requests from "../../../utils/requests";
import ShowSeason from "../../../components/TV/ShowSeason";
import FlipMove from "react-flip-move";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import ShowTvSeriesDetails from "../../../components/TV/ShowTvSeriesDetails";
import ShowSimilarItems from "../../../components/helper/ShowSimilarItems";
import ShowCastMembers from "../../../components/helper/ShowCastMembers";
const Logo = require('../../../assets/no_image.jpg');
import ShowSeasonsForTvShow from "../../../components/TV/ShowSeasonsForTvShow";

import Link from 'next/link';

const ProviderIcon = ({ provider, url }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  return (
    <Link href={url}>
      <a className="inline-block w-6 h-6 rounded-full overflow-hidden">
        <img src={`${BASE_URL}$/images/providers/${provider}.png`} alt={provider} />
      </a>
    </Link>
  );
}

export default function Tv({ tv, season, characters, watchproviders, recommendation, similar  }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();

  const characters_cast = characters["cast"]
  const number_of_seasons = tv["seasons"]
  const episodes = season["episodes"]

  const providers = watchproviders["US"]
  // console.log(episodes)

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row">
            <img
              src={tv.poster_path ? `${BASE_URL}${tv.poster_path || tv.backdrop_path}` ||`${BASE_URL}${tv.poster_path}` : Logo}
              alt={tv.name}
              className="w-1/4 h-1/4 rounded-lg shadow-lg"
            />
            <div className="sm:ml-4 sm:mr-4">
              <ShowTvSeriesDetails tv={tv} />
              {providers && providers.flatrate.map((provider) => 
                <h1>{provider.provider_name}</h1>
                // <ProviderIcon provider={provider.provider_name} url={provider.logo_path} />
              )}
              

              {/* <div className="flex flex-wrap space-y-4">
                <h1 className="text-2xl font-semibold text-white leading-tight mb-2">{seasons.map((member) => (member.name))}</h1>
              </div> */}

              {/* {number_of_seasons && number_of_seasons.map((season_) => (
                <div>
                  <h2
                      key={season_.is}
                      onClick={() => router.push(`./${tv.id}/?season=${season_.season_number}`)}
                      className="last:pr-24 cursor-pointer"
                  >
                      {season_.season_number == 0 ? "Special": "Season " + season_.season_number}
                  </h2>
                  <img
                    src={season_.poster_path ? `${BASE_URL}${season_.poster_path || season_.backdrop_path}` ||`${BASE_URL}${season_.poster_path}` : Logo}
                    alt={season_.name}
                    className="w-1/4 h-1/4 rounded-lg shadow-lg"
                  />
                </div>
              ))} */}

              <ShowSeasonsForTvShow tv_show_id={tv.id} type_name={"Seasons"} items={number_of_seasons}/>
              
              {/* <FlipMove className="my-5 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-5">
                {episodes&& episodes.map((result) => (
                    <ShowSeason key={result.id} episode={result}/>
                ))}
              </FlipMove> */}


              <ShowCastMembers type_name={"Cast"} items={characters_cast}/>
              <ShowSimilarItems type_name={"Recommendations"} items={recommendation} media_type={"tv"}/>
              <ShowSimilarItems type_name={"Similar"} items={similar} media_type={"tv"}/>

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
  const newseason = context.query.season

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

  const watchprovidersrequest = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}/watch/providers?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());

  // const seasonrequest = await fetch(
  //   `https://api.themoviedb.org/3/${resolvedUrl}/season/${season}?api_key=${process.env.API_KEY}&language=en-US`
  // ).then((res) => res.json());

  const newseasonrequest = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}/season/${newseason?newseason:1}?api_key=${process.env.API_KEY}`
  ).then((res) => res.json());
  // console.log(newseasonrequest)
  return {
    props: {
      tv: tvrequest,
      season: newseasonrequest,
      characters: charactersrequest,
      watchproviders: watchprovidersrequest.results,
      recommendation: recommendationmovierequest,
      similar: similarmovierequest
    },
  };
}
