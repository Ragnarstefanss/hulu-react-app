import Image from "next/image";
import Head from "next/head";
import Header from "../../../components/Header"
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import Cast from "../../../components/Cast";

import requests from "../../../utils/requests";
import SimilarItems from "../../../components/SimilarItems";
import Thumbnail from "../../../components/Thumbnail";
import ShowSeason from "../../../components/TV/ShowSeason";
const Logo = require('../../../assets/no_image.jpg');
import FlipMove from "react-flip-move";
import React, { useState, useEffect } from 'react';
import { forwardRef } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import ShowTvSeriesDetails from "../../../components/helper/ShowTvSeriesDetails";
import ShowSimilarItems from "../../../components/helper/ShowSimilarItems";
import ShowCastMembers from "../../../components/helper/ShowCastMembers";


async function getEpisodes(showId, seasonNumber) {
  const data = await fetch(
    `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=${process.env.API_KEY}`
  ).then((res) => res.json());
  return data;
}

export default function Tv({ tv, season, characters, recommendation, similar  }) {
  //console.log("hello", characters)
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();

  //{adult, gender, id, known_for_department, name, original_name, popularity, profile_path, cast_id, character, credit_id, order}
  const characters_cast = characters["cast"]
  //{adult, gender, id, known_for_department, name, original_name, popularity, profile_path, credit_id, department, job})
  // console.log(tv.seasons)
  const seasons = tv["seasons"]
  console.log(season)

  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col sm:flex-row">
            <img 
              src={ tv.poster_path ? `${BASE_URL}${tv.poster_path || tv.backdrop_path}` ||`${BASE_URL}${tv.poster_path}` : Logo}
              alt={tv.name} 
              className="w-1/4 h-1/4 rounded-lg shadow-lg" 
            />
            <div className="sm:ml-4 sm:mr-4">
              <ShowTvSeriesDetails tv={tv} />
              
              
              {/* <div className="flex flex-wrap space-y-4">
                <h1 className="text-2xl font-semibold text-white leading-tight mb-2">{seasons.map((member) => (member.name))}</h1>
              </div> */}

              {seasons && seasons.map((season_) => (
                  <h2
                      key={season_.is}
                      onClick={() => router.push(`./${tv.id}/?season=${season_.season_number}`)}
                      className="last:pr-24 cursor-pointer"
                  >
                      {season_.season_number == 0 ? "Special": "Season " + season_.season_number}
                  </h2>
              ))}
              <FlipMove className="my-5 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-5">
                {season.episodes && season.episodes.map((result) => (
                    <ShowSeason key={result.id} episode={result}/>
                ))}
              </FlipMove>


              <ShowCastMembers type_name={"Cast"} items={characters_cast}/>
              <ShowSimilarItems type_name={"Recommendations"} items={recommendation}/>
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

  const seasonrequest = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}/season/${season}?api_key=${process.env.API_KEY}&language=en-US`
  ).then((res) => res.json());

  const newseasonrequest = await fetch(
    `https://api.themoviedb.org/3/${resolvedUrl}/season/${requests[newseason]?.url || 1}?api_key=${process.env.API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      tv: tvrequest,
      season: newseasonrequest,
      characters: charactersrequest,
      recommendation: recommendationmovierequest,
      similar: similarmovierequest
    },
  };
}
