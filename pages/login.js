import Head from "next/head";
import Header from "../components/Header";
import requests from "../utils/requests";
import Image from "next/legacy/image";
//import tmdb from "../public/tmdb.svg";


export default function Login({ results }) {
  return (
    <>
    <Header />
    <div>
      <h1>Login</h1>
      <p>This is the login page.</p>
    </div>
    </>
  );
}

