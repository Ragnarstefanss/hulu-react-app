import Image from "next/image";
import Header from "../../../components/Header"
import requests from "../../../utils/requests";
import ShowSeason from "../../../components/TV/ShowSeason";
import FlipMove from "react-flip-move";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import ShowSimilarItems from "../../../components/helper/ShowSimilarItems";
import ShowCastMembers from "../../../components/helper/ShowCastMembers";
const Logo = require('../../../assets/no_image.jpg');
import ShowSeasonsForTvShow from "../../../components/TV/ShowSeasonsForTvShow";

import Link from 'next/link';
import ShowContentsDetails from "../../../components/helper/ShowContentsDetails";

export default function Tv({ tv, season, characters, recommendation, similar  }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();

  const characters_cast = characters["cast"]
  const number_of_seasons = tv["seasons"]
  const episodes = season["episodes"]

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
              <ShowContentsDetails item={tv} />
              <ShowSeasonsForTvShow tv_show_id={tv.id} type_name={"Seasons"} items={number_of_seasons}/>
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
    `https://api.themoviedb.org/3/${resolvedUrl}/season/${newseason?newseason:1}?api_key=${process.env.API_KEY}`
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
