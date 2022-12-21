import Head from "next/head";
import Header from "../../components/Header";
import requests from "../../utils/requests";
import Image from "next/image";
//import tmdb from "../public/tmdb.svg";


export default function Account({ results }) {
  return (
    <>
    <Header />
    <h1>Account</h1>
    </>
  );
}

