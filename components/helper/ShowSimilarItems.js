import SimilarItems from "../SimilarItems";

function ShowSimilarItems({ type_name, items, media_type }) {
    return (
        <div>
            <div className="flex flex-wrap space-y-4">
                <h1 className="text-2xl font-semibold text-white leading-tight mb-2">{type_name}</h1>
            </div>
            <div className="flex flex-wrap my-5">
                {items && items["results"].slice(0, 6).map((item) => (
                    <SimilarItems key={item.id} similar={item} media_type={media_type}/>
                ))}
            </div>
        </div>
    );
}

export default ShowSimilarItems