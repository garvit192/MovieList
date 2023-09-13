import React, {useEffect, useState} from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const ApiURL = "http://www.omdbapi.com/?apikey=9cb96251";


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getMovies = async (title) => {
        const response = await fetch(`${ApiURL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        getMovies("nolan");
    }, []);

    return(
        <div className="app">
            <h1>MovieList</h1>

            <div className="search">
                <input 
                    type="text" 
                    placeholder="Search for a movie" 
                    value= {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon} 
                    alt="Search" 
                    onClick={() => getMovies(searchTerm)}
                />

            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {
                            movies.map((movie, index) => (
                                <MovieCard movie={movie} key={index}/>
                            ))
                        }
                        <MovieCard movie={movies[1]}/>
                </div>
                ):(
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
            
        </div>
    );
}

export default App;