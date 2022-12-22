import Image from "next/image";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";


const ShowSeason = forwardRef(({ episode }, ref) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original/";
    const router = useRouter();
    
    return (
        <div ref={ref} className="p-2 group sm:hover:scale-105 hover:z-50">
            <Image
                height={1080}
                width={1920}
                src={
                    `${BASE_URL}${episode.still_path}` ||`${BASE_URL}${episode.still_path}`
                }
                alt="images"
                sizes="100vw"
                style={{
                    width: "100%",
                    height: "auto"
                }} />
            <div className="p-2">
                <h3 className="mt-1 text-2xl text-white group-hover:font-bold">
                    {episode.episode_number}. {episode.name}
                </h3>
                <p className="flex items-center opacity-100 group-hover:opacity-100">
                    {/* {episode.air_date}<br/> */}
                    {episode.overview}<br/>
                </p>
            </div>
        </div>
    
    );
})

ShowSeason.displayName = "Season Content";

export default ShowSeason;