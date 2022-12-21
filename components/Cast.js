import Image from "next/legacy/image";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";

const Cast = forwardRef(({ member }, ref) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original/";
    const router = useRouter();

    return (
        <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 p-4 cursor-pointer" ref={ref} onClick={() => {
            router.push({
            pathname: '/person/[id]',
            query: { id: member.id },
            })
        }}>
            <img src={`${BASE_URL}${member.profile_path}`} alt={member.name} className="w-full h-48 object-cover rounded-lg" />
            <h2 className="text-lg font-bold mt-2">{member.name}</h2>
            <p className="text-sm text-gray-600">{member.character}</p>
        </div>        
    );
})

Cast.displayName = "Cast";

export default Cast;