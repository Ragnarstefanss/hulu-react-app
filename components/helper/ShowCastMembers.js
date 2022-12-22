import Cast from "../Cast";

function ShowCastMembers({ type_name, items }) {
    return (
        <div>
              <div className="flex flex-wrap space-y-4">
                <h1 className="text-2xl font-semibold text-white leading-tight mb-2">{type_name}</h1>
              </div>
              <div className="flex flex-wrap my-5">
                {items && items.slice(0, 12).map((member) => (
                  <Cast key={member.id} member={member}/>
                ))}
            </div>
        </div>
    );
}

export default ShowCastMembers