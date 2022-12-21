import {
    HomeIcon,
    UserIcon,
    CheckBadgeIcon,
    BookmarkIcon,
    BoltIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

import Image from "next/image"
import HeaderItem from "./HeaderItem"
import { forwardRef } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";


function Header() {
    const router = useRouter();
    return (
        <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
            <div className="flex flex-grow justify-evenly max-w-2xl">
                <div onClick={() => { router.push({ pathname: '/', query: {}, }) }}><HeaderItem title='HOME' Icon={HomeIcon}/></div>
                <div onClick={() => { router.push({ pathname: '/trending', query: {}, }) }}><HeaderItem title='TRENDING' Icon={BoltIcon} /></div>
                <div onClick={() => { router.push({ pathname: '/verified', query: {}, }) }}><HeaderItem title='VERIFIED' Icon={CheckBadgeIcon} /></div>
                <div onClick={() => { router.push({ pathname: '/collections', query: {}, }) }}><HeaderItem title='COLLECTIONS' Icon={BookmarkIcon} /></div>
                <div onClick={() => { router.push({ pathname: '/search', query: {}, }) }}><HeaderItem title='SEARCH' Icon={MagnifyingGlassIcon} /></div>
                <div onClick={() => { router.push({ pathname: '/account', query: {}, }) }}><HeaderItem title='ACCOUNT' Icon={UserIcon} /></div>
            </div>
            <div className="cursor-pointer" onClick={() => { router.push({ pathname: '/', query: {}, }) }}><Image alt="hulu_logo" className="object-contain" src="https://links.papareact.com/ua6" width={200} height={100} /></div>
        </header>
    )
}

export default Header