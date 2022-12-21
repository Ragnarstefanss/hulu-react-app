import Head from "next/head";
import Header from "../../components/Header";
import requests from "../../utils/requests";
import Image from "next/legacy/image";
//import tmdb from "../public/tmdb.svg";


export default function Search({ results }) {
  return (
    <>
    <Header />
    <h1>Search</h1>
    </>
  );
}

