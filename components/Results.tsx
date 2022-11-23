import Thumbnail from "./Thumbnail";
//import FlipMove from "react-flip-move";

function Results({ results }) {
    return (
        <div>
            {results.map((result) => (
                <Thumbnail key={result.id} result={result}/>
            ))}
        </div>
    );
}

export default Results