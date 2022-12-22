import Image from "next/image";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";

const SeasonDetails = forwardRef(({ season }, ref) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original/";
    const router = useRouter();
    const item = season
    return (
        <div className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 cursor-pointer mb-5" ref={ref} onClick={() => {
            router.push({
            pathname: season.media_type ? '/'+season.media_type+'/[id]' : '/tv/[id]',
            query: { id: item.id },
            })
        }}>
            <img src={`${BASE_URL}${item.poster_path}`} alt={item.name} className="w-full h-full object-cover rounded-lg" />
            <h2 className="text-lg font-bold mt-2">{item.season_number == 0 ? "Specials": "Season " + item.season_number}</h2>
            {/* <p className="text-sm text-gray-600">{item.air_date}</p> */}
        </div>
    );
})

SeasonDetails.displayName = "Season Details";

export default SeasonDetails;