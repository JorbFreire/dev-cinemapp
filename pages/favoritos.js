import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import {
  Favorite,
  FavoriteBorder,
} from '@material-ui/icons';

import Header from '../components/Header';
import styles from '../styles/Home.module.css'

export default function Favoritos({ isFavorite, setIsFavorite}) {
  const [ movies, setMovies ] = useState([]);

  useEffect(() => {
    const temp = localStorage.getItem('favoritesList');
    console.log("temp");
    console.log(temp);
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Cinemapp</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

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