
import { isEmpty } from "lodash"
import MovieCard from "@/components/MovieCard";

interface MovieListProps{
    data : Record<string,any>[];
    title : string;
}

export default function MovieList({data,title} : MovieListProps) {
    if(isEmpty(data)){
        return false;
    }
    console.log(data);
   return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => (
                <MovieCard key={movie.id} url={movie.thumbnailUrl} id={movie.id} title={movie.title} duration={movie.duration}/>
          ))}
        </div>
      </div>
    </div>
   ) 
}