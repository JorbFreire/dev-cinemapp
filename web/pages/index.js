import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import {
  Favorite,
  FavoriteBorder,
  SearchRounded,
} from '@material-ui/icons';

import Header from '../components/Header';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [ loading, setLoading ] = useState(false);
  const [ movies, setMovies ] = useState([]);
  const [ search, setSearch ] = useState('')
  const [ isFavorite, setIsFavorite ] = useState([]); 
  
  async function submitSearch(event) {
    event.preventDefault();
    setLoading(true);
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=925eba28&s=${search}`
    );
    setMovies(response.data.Search);
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Cinemapp</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <form
        className={styles.search}
        onSubmit={event => submitSearch(event)}
      >
        <input
          type='text'
          placeholder='Encontrar filme'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
          {
            loading ?
              <CircularProgress className={styles.progressIcons} /> :
              <button className={styles.searchIcon} type='submit'>
                <SearchRounded />
              </button>
          }
      </form>

      <main className={styles.movies}>
        {movies ? movies.map(movie => {
          const thisFavorite = localStorage.getItem(`favorite${movie.imdbID}`);
          isFavorite[movie.imdbID] = thisFavorite;
          return (
            <figure key={movie.imdbID} className={styles.movie} >
              <Card 
                className={styles.movieCard}
                >
                <CardHeader title={movie.Title} subheader={movie.Year} />
                <img src={movie.Poster} alt=""/>
                <CardActions disableSpacing>
                  <IconButton onClick={() => {
                    if(isFavorite[movie.imdbID] == "true")
                      localStorage.setItem(`favorite${movie.imdbID}`, false);
                    else
                      localStorage.setItem(`favorite${movie.imdbID}`, true);
                    setIsFavorite([...isFavorite])
                  }}>
                    {isFavorite[movie.imdbID] == "true" ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </CardActions>
              </Card>
            </figure>
          )
        }) : <h2>Nenhum filme encontrado 🙁</h2> } 
      </main>
    </div>
  )
}
