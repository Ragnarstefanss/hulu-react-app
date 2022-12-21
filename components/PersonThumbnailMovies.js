import Image from "next/image"
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";


const PersonThumbnailMovies = forwardRef(({ result }, ref) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original/";
    const router = useRouter();

    return (
        <Link href={`/movie/${result.id}`}>
            <div ref={ref} className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50" onClick={() => {
            router.push({
            pathname: '/movie/[id]',
            query: { id: result.id },
            })
        }}>
                <Image
                    layout="responsive"
                    height={300}
                    width={120}
                    src={ result.poster_path ? `${BASE_URL}${result.poster_path || result.backdrop_path}` ||`${BASE_URL}${result.poster_path}` : require('../assets/no_image.jpg')}
                    alt="images"
                />
                <div className="p-2">
                    <p className="truncate max-w-md">{result.overview}</p>
                    <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
                        {result.title || result.original_name}
                    </h2>
                    <p className="flex items-center opacity-0 group-hover:opacity-100">
                        {result.media_type && `${result.media_type} •`}{" "}
                        {result.release_date || result.first_air_date} •{" "}
                        <HandThumbUpIcon className="h-5 mx-2" />
                        {result.vote_count}
                    </p>
                </div>
            </div>
        </Link>
    );
})

PersonThumbnailMovies.displayName = "PersonThumbnailMovies";

export default PersonThumbnailMovies;