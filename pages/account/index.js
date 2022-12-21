import React from 'react';
import { useRouter } from 'next/router';
import AccountsPage from './accounts_page';
import LoginPage from '../login';

import Head from "next/head";
import Header from "../../components/Header";
import requests from "../../utils/requests";
import Image from "next/legacy/image";
//import tmdb from "../public/tmdb.svg";


export default function Account({ }) {
  const router = useRouter();
  const isLoggedIn = true; // replace this with your own logic to check if the user is logged in

  if (isLoggedIn) {
    return <AccountsPage />;
  } else {
    //router.push('/login');
  }
    
}

