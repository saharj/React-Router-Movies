import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies") // Study this endpoint with Postman
        .then((response) => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Server Error", error);
        });
    };
    if (!movieList) {
      getMovies();
    }
  }, [movieList]);

  const addToSavedList = (id) => {
    // This is stretch. Prevent the same movie from being "saved" more than once
  };

  return (
    <div>
      <SavedList
        list={
          [
            /* This is stretch */
          ]
        }
      />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>
    </div>
  );
}
