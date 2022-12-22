import SimilarItems from "../SimilarItems";
import SeasonDetails from "./SeasonDetails";

function ShowSeasonsForTvShow({ type_name, items }) {
    return (
        <div className="mb-10">
            <div className="flex flex-wrap space-y-4">
                <h1 className="text-2xl font-semibold text-white leading-tight mb-2">{type_name}</h1>
            </div>
            <div className="flex flex-wrap my-5">
                {items && items.map((item) => (
                    <SeasonDetails key={item.id} season={item}/>
                ))}
            </div>
        </div>
    );
}

export default ShowSeasonsForTvShow