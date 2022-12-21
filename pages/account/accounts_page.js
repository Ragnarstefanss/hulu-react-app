import React from 'react';
import { useRouter } from 'next/router';
import LoginPage from '../login';

import Head from "next/head";
import Header from "../../components/Header";
import requests from "../../utils/requests";
import Image from "next/legacy/image";
//import tmdb from "../public/tmdb.svg";


export default function AccountsPage({ }) {
  return (
    <>
    <Header />
   <div><h1>Accounts</h1><p>This is the accounts page.</p></div>
   </>
  );
}

