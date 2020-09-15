import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

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
    if (movieList.length === 0) {
      getMovies();
    }
  }, [movieList]);

  const addToSavedList = (id) => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    const movie = movieList.filter((m) => {
      return parseInt(m.id, 10) === parseInt(id, 10);
    });
    if (saved.includes(movie[0]) === false) {
      setSaved((saved) => [...saved, movie[0]]);
    }
  };

  return (
    <div>
      <SavedList list={saved} />
      <Switch>
        <Route path="/movies/:id">
          <Movie addToList={addToSavedList} />
        </Route>
        <Route path="/">
          <MovieList movies={movieList} />
        </Route>
      </Switch>
    </div>
  );
}
